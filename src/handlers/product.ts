import Shopify, { DataType } from '@shopify/shopify-api';
import Excel from 'exceljs';
import { Handler } from '../types';

export const addProduct: Handler = async (req, res) => {
  try {
    // const session = (await Shopify.Utils.loadCurrentSession(req, res, false))!;
    const session = { shop: process.env.SHOP!, accessToken: process.env.ACCESS_TOKEN };
    let client = new Shopify.Clients.Rest(session.shop, session.accessToken);

    const workbook = new Excel.Workbook();
    const worksheet = await workbook.csv.readFile('./data/home-and-garden.csv');

    let productMap = new Map();
    for (let i = 2; i < worksheet.rowCount + 1; i++) {
      const row = worksheet.getRow(i);
      const productHandle = row.getCell(1).value;
      let productId: number, variantId;

      if (!productMap.has(productHandle)) {
        //add product
        let productBody = {
          product: {
            title: row.getCell(2).value,
            body_html: row.getCell(3).value,
            vendor: row.getCell(4).value,
            product_type: row.getCell(5).value,
            tags: (row.getCell(6).value as string)?.split(',')
          }
        };
        let resData = await client.post({
          path: 'products',
          data: productBody,
          type: DataType.JSON
        });
        const productData = resData.body as any;
        productId = productData.product.id;
        variantId = productData.product.variants[0].id;
        productMap.set(productHandle, productId);
      } else {
        productId = productMap.get(productHandle);
      }

      //add product Image
      let imageBody = {
        image: {
          position: row.getCell(26).value,
          src: row.getCell(25).value
        }
      };
      client = new Shopify.Clients.Rest(session.shop, session.accessToken);
      let resData = await client.post({
        path: `products/${productId}/images`,
        data: imageBody,
        type: DataType.JSON
      });
      const imageData = resData.body as any;
      const imageId = imageData.image.id;

      // add product Variant
      let variantBody = {
        variant: {
          image_id: imageId,
          option1: row.getCell(9).value,
          option3: row.getCell(11).value,
          option2: row.getCell(13).value,
          grams: row.getCell(15).value,
          price: row.getCell(20).value
        }
      };
      if (variantId != undefined) {
        resData = await client.put({
          path: `products/${productId}/variants/${variantId}`,
          data: variantBody,
          type: DataType.JSON
        });
      } else {
        resData = await client.post({
          path: `products/${productId}/variants`,
          data: variantBody,
          type: DataType.JSON
        });
      }
    }

    res.send({
      msg: 'add success'
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      msg: 'server error'
    });
  }
};
