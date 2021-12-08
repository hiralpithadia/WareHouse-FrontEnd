import * as axios from "axios";
const RETRY_COUNT = 5;

export default class Api {
  constructor() {
    this.api_url = "http://localhost:7000";
  }

  init = () => {
    let headers = {
      Accept: "application/json",
    };
    this.client = axios.create({
      baseURL: this.api_url,
      timeout: 31000,
      headers: headers,
    });
    return this.client;
  };

  /**
   *
   * @param {*} uri
   * @returns Response of Products, Sales & articles.
   * Handle the unreliable API using Retry loops.
   */
  performGet = async (uri) => {
    for (let i = 0; i < RETRY_COUNT; i++) {
      try {
        let response = await this.init().get(uri);
        return response;
      } catch (e) {
        console.error(e);
        sleep(500);
      }
    }
  };

  /**
   *
   * @param {*} uri
   * @param {*} data
   * @returns Post data of Sales.
   * Handle the unreliable API using Retry loops.
   */
  performPost = async (uri, data) => {
    for (let i = 0; i < RETRY_COUNT; i++) {
      try {
        let response = await this.init().post(uri, data);
        return response;
      } catch (e) {
        console.error(e);
        sleep(500);
      }
    }
  };

  /**
   *
   * @param {*} uri
   * @param {*} data
   * @returns Patch/bulkPatck data for Articles.
   * Handle the unreliable API using Retry loops.
   */
  performPatch = async (uri, data) => {
    for (let i = 0; i < RETRY_COUNT; i++) {
      try {
        let response = await this.init().patch(uri, data);
        return response;
      } catch (e) {
        console.error(e);
        sleep(500);
      }
    }
  };

  /**
   *
   * @returns Product response.
   */
  getProducts = async () => {
    let response = await this.performGet("/products");
    return response;
  };

  /**
   *
   * @returns Sales response.
   */
  getSalesList = async () => {
    let response = await this.performGet("/sales");
    return response;
  };

  /**
   *
   * @returns Articles response.
   */
  getArticles = async () => {
    let response = await this.performGet("/articles");
    return response;
  };

  /**
   *
   * @param {*} data
   * @returns Updating sales
   */
  postSale = async (data) => {
    return await this.performPost("/sales", data);
  };

  /**
   *
   * @param {*} data
   * @returns Updating Articles in bulk quantity
   */
  bulkPatchArticles = async (data) => {
    return await this.performPatch("/articles/", data);
  };
}

/**
 *
 * @param {*} ms
 * @returns promise
 */
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
