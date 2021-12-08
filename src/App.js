import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import Api from "./Api";

const api = new Api();

function App() {
  const [isLoading, setLoading] = useState(false); // State to show Loader.
  const [productsMap, setProductsMap] = useState(null); // State to get Products data form API.
  const [productQty, setProductQty] = useState(null); // State to get values/counts of available products.
  const [articlesMap, setArticlesMap] = useState(null); // State to get Articles data form API.
  const [renderState, setRenderState] = useState(false); // State for check Sale status.
  const [salesList, setSalesList] = useState([]); // State to get and store sales list from API.

  const productRef = useRef({}); // productRef used for collapse product List.
  const inputQtyRef = useRef({}); // inputQtyRef used for Quantity input filed.

  useEffect(() => {
    let productList;
    async function fetchData() {
      setLoading(true);
      try {
        let response = await api.getProducts();
        // get response of Products from api
        productList = response.data;
        let prodMap = {};
        response.data.forEach((product) => {
          prodMap[product.id] = product;
        });
        setProductsMap(prodMap);

        response = await api.getArticles();
        // get response of Articles from api
        let artMap = {};
        response.data.forEach((article) => {
          artMap[article.id] = article;
        });
        setArticlesMap(artMap);
        calcQty(productList, artMap);
        setLoading(false);

        response = await api.getSalesList();
        // get response of Sales List from api
        let salesData = response.data;
        setSalesList(salesData);
      } catch (e) {
        console.error(e, "Error while performing api operation...");
        setLoading(true);
      }
    }
    fetchData();
  }, [renderState]);

  /**
   *
   * @param {*} productList
   * @param {*} articleList
   * Function to calculate the availability of products based on inventory.
   */
  const calcQty = (productList, articleMap) => {
    let productQtyMap = {};
    productList.forEach((product) => {
      let availableQuantity;
      product.articles.forEach((article) => {
        let productQty =
          article.amountRequired === 0
            ? 0
            : Math.floor(
                articleMap[article.id].amountInStock / article.amountRequired
              );
        availableQuantity =
          availableQuantity === undefined
            ? productQty
            : Math.min(availableQuantity, productQty);
      });
      productQtyMap[product.id] = availableQuantity;
    });
    setProductQty(productQtyMap);
  };

  /**
   *
   * @param {*} event
   * @param {*} index
   * Performs Collapse and shows content of no. of available and required inventories.
   */
  const handleCollapse = (event, index) => {
    event.preventDefault();
    productRef.current[index].firstElementChild.classList.toggle("active");
    if (productRef.current[index].lastElementChild.style.maxHeight > "0px") {
      productRef.current[index].lastElementChild.style.maxHeight = 0 + "px";
    } else {
      productRef.current[index].lastElementChild.style.maxHeight =
        productRef.current[index].lastElementChild.scrollHeight + "px";
    }
  };

  /**
   *
   * @param {*} product
   * @param {*} inputQty
   * POST Sale api call.
   */
  const performSale = async (product, inputQty) => {
    setLoading(true);
    // Posting sale Data
    let saleData = {
      productId: product.id,
      amountSold: inputQty,
    };
    await api.postSale(saleData);

    // Posting Article data
    let artRequestList = [];
    product.articles.forEach((productArticle) => {
      let articleId = productArticle.id;
      let subtractQty = productArticle.amountRequired * inputQty;
      let artData = {
        id: articleId,
        amountToSubtract: subtractQty,
      };
      artRequestList.push(artData);
    });
    await api.bulkPatchArticles(artRequestList);
    setLoading(false);
    setRenderState(!renderState);
  };

  /**
   *
   * @param {*} index
   * @param {*} product
   * onClick function to register for sale.
   * Shows alert box with a message if input value is not correct (.eg -ve values or exceeds max value based in avaibility).
   */
  const handleSaleProduct = (index, product) => {
    let inputQty = inputQtyRef.current[index].value;
    inputQty = parseInt(inputQty);
    if (inputQty > 0 && inputQty <= productQty[product.id]) {
      performSale(product, inputQty);
    } else {
      alert(
        `Maximum sale order you can place is: ${inputQtyRef.current[index].max}`
      );
    }
    inputQtyRef.current[index].value = "";
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>WAREHOUSE</p>
      </header>
      {/* Loader */}
      {isLoading && (
        <div className="loaderContainer">
          <img
            src="https://c.tenor.com/5o2p0tH5LFQAAAAi/hug.gif"
            width="100"
            alt="loader"
          />
          <h2>Loading...</h2>
        </div>
      )}
      <div className="App-content">
        {/* Product List includes collapse */}
        <ul className="listOfProducts">
          {productQty &&
            Object.values(productsMap).map((product, index) => (
              <li
                ref={(el) => (productRef.current[index] = el)}
                key={`${product}_${index}`}
                className="productList"
              >
                <div className="listData">
                  <span
                    className="productName"
                    onClick={(e) => handleCollapse(e, index)}
                  >
                    PRODUCT: {product.name}
                  </span>
                  <span className="availableQuantity">
                    {`Available Quantity:`} {productQty[product.id]}
                  </span>
                  <label className="quantityInputLabel"> Quantity:</label>
                  <input
                    type="number"
                    name="quantity"
                    min="0"
                    max={`${productQty[product.id]}`}
                    ref={(el) => (inputQtyRef.current[index] = el)}
                    className="quantityInput"
                  />
                  <button
                    type="button"
                    className="saleBtn"
                    onClick={(e) => handleSaleProduct(index, product)}
                  >
                    SALE
                  </button>
                </div>
                <div className="content">
                  {product.articles &&
                    product.articles.map(
                      (article) =>
                        article &&
                        articlesMap && (
                          <div key={`${article.id}_${index}`}>
                            <p>
                              {articlesMap[article.id].name}:{" "}
                              <span className="articlesAvailable">
                                {articlesMap[article.id].amountInStock}{" "}
                                (Available)
                              </span>{" "}
                              <span className="articlesRequired">
                                {article.amountRequired} (Required)
                              </span>{" "}
                            </p>
                          </div>
                        )
                    )}
                </div>
              </li>
            ))}
        </ul>

        {/* Sale Data section to show all the sales done till now */}
        {salesList && salesList.length > 0 && productsMap && (
          <div>
            <hr />
            <h2>SALE Data</h2>
            <ul>
              {salesList.map((saleData, index) => (
                <li key={`${saleData.productId}_${index}`}>
                  {`PRODUCT: ${
                    productsMap[saleData.productId].name
                  },  QUANTITY: ${saleData.amountSold}`}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
