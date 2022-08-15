import Loading from "components/loading";
import Pagination from "src/components/pagination";
import useLanguage from "utils/use-language";
import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import Layout from "../../components/layout";
import React, {useCallback, useEffect} from "react";
import Item from "../../components/item";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";

function Main() {

  console.log('Main');

  const store = useStore();

  const translation = useLanguage()

  useEffect(() => {
    store.get('catalog').loadProducts(0);
  }, []);

  const select = useSelector(state => ({
    items: state.catalog.items,
    isLoading: state.catalog.isLoading,
    amount: state.basket.amount,
    sum: state.basket.sum,
    count: state.catalog.count,
  }));

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    // запрос страницы товара
    getProducts: useCallback(skip => store.get('catalog').loadProducts(skip), []),
  };

  const renders = {
    item: useCallback(item => <Item item={item} onAdd={callbacks.addToBasket}/>, []),
  };

  return (
    <Layout head={<h1>{translation('shop')}</h1>}>
      <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount}
                    sum={select.sum}/>
      {select.isLoading ? <Loading/> :
        <List items={select.items} renderItem={renders.item}/>}
      <Pagination count={select.count} onPage={callbacks.getProducts}/>
    </Layout>
  );
}

export default React.memo(Main);