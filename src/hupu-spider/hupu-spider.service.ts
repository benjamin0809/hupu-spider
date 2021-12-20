/*
 * @Author: your name
 * @Date: 2021-12-16 20:46:00
 * @LastEditTime: 2021-12-21 00:11:37
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \hupu-spider\src\hupu-spider\hupu-spider.service.ts
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as superagent from 'superagent';
import * as url from 'url';
import { Repository } from 'typeorm';
import { CreateHupuSpiderDto } from './dto/create-hupu-spider.dto';
import { UpdateHupuSpiderDto } from './dto/update-hupu-spider.dto';
import { HupuSpider } from './entities/hupu-spider.entity';
import cheerio from 'cheerio';
import { Qiniu } from 'src/utils/qiniu';
import dateUtils from 'src/utils/date-utils';
function fIsUrL(sUrl) {
  const sRegex =
    '^((https|http|ftp|rtsp|mms)?://)' +
    "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" + //ftp的user@
    '(([0-9]{1,3}.){3}[0-9]{1,3}' + // IP形式的URL- 199.194.52.184
    '|' + // 允许IP和DOMAIN（域名）
    "([0-9a-z_!~*'()-]+.)*" + // 域名- www.
    '([0-9a-z][0-9a-z-]{0,61})?[0-9a-z].' + // 二级域名
    '[a-z]{2,6})' + // first level domain- .com or .museum
    '(:[0-9]{1,4})?' + // 端口- :80
    '((/?)|' + // a slash isn't required if there is no file name
    "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";
  const re = new RegExp(sRegex);
  //re.test()
  if (re.test(sUrl)) {
    return true;
  }
  return false;
}

type ArticleDto = {
  id: number;
  articleid: string;
  title: string;
  avatar: string;
  username: string;
  images: string;
  sourceUrl: string;
  createTime?: any;
  articleTime?: any;
  modifiedTime?: any;
};

type ImageDto = {
  key: string;
  url: string;
};

@Injectable()
export class HupuSpiderService {
  constructor(
    @InjectRepository(HupuSpider)
    private hupuRepository: Repository<HupuSpider>,
  ) {}
  create(createHupuSpiderDto: CreateHupuSpiderDto) {
    return this.hupuRepository.save(createHupuSpiderDto);
  }

  findAll() {
    return this.hupuRepository.find();
  }

  async upload() {
    const json = await this.hupuRepository.find();
    const acticles = new Set();
    const article: any[] = json.reduce((acc: ArticleDto[], cur: any) => {
      if (!acticles.has(cur.articleid)) {
        acticles.add(cur.articleid);
        acc.push(cur);
        return acc;
      } else {
        return acc;
      }
    }, []);

    const images = article.reduce((acc: ImageDto[], cur: ArticleDto) => {
      const imgs = cur?.images.split(',');
      if (imgs.length > 0) {
        imgs.forEach((item, index) => {
          acc.push({
            key: cur.articleid + '-' + index,
            url: item,
          });
        });
        return acc;
      } else {
        return acc;
      }
    }, []);

    const qiniu = new Qiniu();
    for (const item of images) {
      await qiniu.fetchWebUrlPlus(item.url, item.url);
    }
  }
  findOne(id: number) {
    return this.hupuRepository.findOne();
  }

  update(id: number, updateHupuSpiderDto: UpdateHupuSpiderDto) {
    return `This action updates a #${id} hupuSpider`;
  }

  remove(id: number) {
    return `This action removes a #${id} hupuSpider`;
  }
  getMobileHupuImages(spider_url) {
    return new Promise((resolve) => {
      superagent.get(spider_url).end((err, res) => {
        if (err) {
          console.error(err);
          return;
        }

        const $ = cheerio.load(res.text);
        const articalList = $('.seo-dom a');
        const tasks = [];
        articalList.each((idx, element) => {
          const $element = $(element);
          const articleHref = $element.attr('href');
          if (!articleHref) return;
          const href = url.resolve(spider_url, articleHref);
          // const href = spider_url + articleHref;
          if (fIsUrL(href)) {
            tasks.push(this.getArticleDetails(href, articleHref));
          }
        });

        Promise.all(tasks)
          .then((res) => {
            const result = {
              result: true,
              spiderUrl: spider_url,
              successCount: 0,
              failedCount: 0,
              error: [],
            };
            res &&
              res.forEach((item) => {
                if (item.result) {
                  result.successCount++;
                } else {
                  result.failedCount++;
                  result.error.push(item);
                }
              });
            resolve(result);
          })
          .catch((error) => {
            resolve({
              result: false,
              message: 'spider action failed',
              error: error,
            });
          });
      });
    });
  }

  insertArticle(article: CreateHupuSpiderDto) {
    return new Promise((resolve) => {
      this.create(article)
        .then((res) => {
          resolve({ result: true, message: 'insert into table ok' });
        })
        .catch((err) => {
          console.error(err);
          resolve({ result: false, message: 'this item failed', error: err });
        });
    });
  }

  // getArticleDetails(href, articleHref) {
  //   console.log(href, articleHref);
  // }
  getArticleDetails(href, articleHref) {
    const dto: CreateHupuSpiderDto = this.hupuRepository.create();
    const dtos: CreateHupuSpiderDto[] = [];
    const qiniu = new Qiniu();
    return new Promise((resolve, reject) => {
      superagent.get(href).end(async (error, resp) => {
        if (error) {
          console.error(error);
          resolve({
            href: href,
            error: error,
            result: false,
          });
          return;
        }
        const $ = cheerio.load(resp.text);
        const title = $('.bbs-user-title').text(); // 帖子标题
        const userInfo = $('.bbs-user-info');
        // console.log('userInfo,', userInfo);
        const avataoInfo = $(userInfo);
        // console.log('avataoInfo,', avataoInfo);
        const img = $(avataoInfo);
        // console.log('img,', img);
        const imgSrc = img.attr('src');
        // console.log('imgSrc,', imgSrc);
        let avatar = $('.bbs-user-info .bbs-user-info-avator img').attr('src'); // 用户头像
        const username = $('.bbs-user-info-name').text(); // 用户名称

        if (avatar) {
          await qiniu.fetchWebUrlPlus(avatar, username);
        }

        if (username) {
          avatar = await qiniu.getPublicDownloadUrl(username);
        }

        const stime = dateUtils.translateHupuTime(
          $('.bbs-user-info-time').text(),
        ); // 文章发帖时间

        dto.sourceUrl = href;
        dto.title = title || '无标题';
        dto.username = username;
        dto.avatar = avatar || 'notAvatar';
        dto.articleid =
          Number(articleHref.replace(/[^0-9]/gi, '')) || +new Date();
        dto.articleTime = stime;
        const img_elements = $('.bbs-thread-content center center center img');

        for (const ele of img_elements) {
          const $ele = $(ele);
          // 内容图片
          const src = $ele.attr('src') || $ele.attr('data-src');
          // 内容图片
          const url = src.split('?x-oss-process=image').slice(0, 1).join('');
          const id = $ele.attr('id');
          const fileName =
            dto.articleid + '-' + id + '-' + url.split('/').slice(-1);
          const res = await qiniu.fetchWebUrlPlus(url, fileName);
          const resultUrl = res.url;

          dto.images && dto.images.length > 0
            ? (dto.images += ',' + resultUrl)
            : (dto.images = resultUrl);
          dtos.push(dto);
        }
        console.log(dto.images);
        this.insertArticle(dto);
        resolve(dtos);
      });
    });
  }
}
