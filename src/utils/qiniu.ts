/*
 * @Author: your name
 * @Date: 2021-12-19 23:06:05
 * @LastEditTime: 2021-12-19 23:22:18
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \hupu-spider\src\utils\qiniu.ts
 */
import * as qiniu from 'qiniu';

const accessKey = 'jfxJjeElvLIUgldn-OmFQrSL4x4WTbZNRSkxEWZP';
const secretKey = 'hCxKrvlFocCyjeP0WQ-gJerutHlb-_gG8-iUJ8S-';
const bucket = 'bullet';

const publicBucketDomain = 'https://image.popochiu.com';
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

const options = {
  scope: bucket,
};

const putPolicy = new qiniu.rs.PutPolicy(options);

const config = new qiniu.conf.Config({
  // 空间对应的机房
  zone: qiniu.zone.Zone_z2,
});

const formUploader = new qiniu.form_up.FormUploader(config);
const bucketManager = new qiniu.rs.BucketManager(mac, config);
const putExtra = new qiniu.form_up.PutExtra();

export class Qiniu {
  getToken() {
    return putPolicy.uploadToken(mac);
  }

  /**
   * 上传文件流 数据流上传（表单方式
   * @param {*} readableStream 文件流
   * @param {*} filename 文件名
   */
  putStream(readableStream, filename) {
    return new Promise((resolve, reject) => {
      formUploader.putStream(
        this.getToken(),
        filename,
        readableStream,
        putExtra,
        async function (respErr, respBody, respInfo) {
          if (respErr) {
            reject(respErr);
            throw respErr;
          }
          if (respInfo.statusCode == 200) {
            resolve({
              hash: respBody.hash,
              key: respBody.key,
              url: await bucketManager.publicDownloadUrl(
                publicBucketDomain,
                filename,
              ),
            });
          } else {
            console.error(respBody);
            reject(respBody);
          }
        },
      );
    });
  }

  /**
   * 字节数组上传（表单方式）
   * @param {*} data 字节
   * @param {*} filename 文件名
   */
  put(data, filename) {
    return new Promise((resolve, reject) => {
      formUploader.put(
        this.getToken(),
        filename,
        data,
        putExtra,
        async function (respErr, respBody, respInfo) {
          if (respErr) {
            reject(respErr);
            throw respErr;
          }
          if (respInfo.statusCode == 200) {
            resolve({
              hash: respBody.hash,
              key: respBody.key,
              url: await bucketManager.publicDownloadUrl(
                publicBucketDomain,
                filename,
              ),
            });
          } else {
            console.error(respBody);
            reject(respBody);
          }
        },
      );
    });
  }

  uploadFile(filename, localFile) {
    return new Promise((resolve, reject) => {
      // 文件上传
      formUploader.putFile(
        this.getToken(),
        filename,
        localFile,
        putExtra,
        async function (respErr, respBody, respInfo) {
          if (respErr) {
            console.error(respErr);
            reject(respErr);
          }
          if (respInfo.statusCode == 200) {
            resolve({
              hash: respBody.hash,
              key: respBody.key,
              url: await bucketManager.publicDownloadUrl(
                publicBucketDomain,
                '',
              ),
            });
          } else {
            reject(respBody);
            console.error(respBody);
          }
        },
      );
    });
  }

  fetchWebUrl(resUrl, key) {
    return new Promise((resolve, reject) => {
      bucketManager.fetch(
        resUrl,
        bucket,
        key,
        function (err, respBody, respInfo) {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            if (respInfo.statusCode == 200) {
              resolve({
                hash: respBody.hash,
                key: respBody.key,
              });
            } else {
              reject(respBody);
              console.error(respBody);
            }
          }
        },
      );
    });
  }

  fetchWebUrlPlus(resUrl, key) {
    return new Promise((resolve, reject) => {
      bucketManager.fetch(
        resUrl,
        bucket,
        key,
        async function (err, respBody, respInfo) {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            if (respInfo.statusCode == 200) {
              resolve({
                hash: respBody.hash,
                key: respBody.key,
                url: await bucketManager.publicDownloadUrl(
                  publicBucketDomain,
                  key,
                ),
              });
            } else {
              reject(respBody);
              console.error(respBody);
            }
          }
        },
      );
    });
  }

  getPublicDownloadUrl(key) {
    return bucketManager.publicDownloadUrl(publicBucketDomain, key);
  }
}
