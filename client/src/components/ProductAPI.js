import React, { useState } from "react";

const ProductAPI = () => {
    const data = useSelector((state) => state.data.products);

  const renderPrizeItem = ({ item }) => (
    <View style={styles.listItem}>
      <Image source={{ uri: item.image }} style={{ width: 150, height: 200 }} />
      <Text style={styles.year}>{item.title}</Text>
      <Text style={styles.year}>{item.price}</Text>
    </View>
  );

  return (
    <FlatList
      style={styles.list}
      data={data}
      keyExtractor={(item) => {
        item.id;
      }}
      renderItem={renderPrizeItem}
    />
  );
};

export default ProductAPI;

/*
const Home = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const fetchAPI = () => {
    const apiURL = "https://fakestoreapi.com/products";
    setIsLoading(true);
    fetch(apiURL)
      .then((resp) => {
        if (resp.ok) {
          console.log("Response OK from server");
          return resp.json();
        } else {
          console.log(
            `Unsuccessful response from server. Status: ${resp.status}`
          );
        }
      })
      .then((data) => {
        if (data !== undefined) {
          dispatch(saveProducts(data));
          setIsLoading(false);
          console.log(`Data received from response`);
        } else {
          console.log(`No data received from response`);
        }
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size={"large"} />
      ) : (
        <Products navigation={navigation} />
      )}
    </View>
  );
};
*/