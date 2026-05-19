import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>App Lista de Filmes</Text>

      <Text style={styles.text}>
        Exemplo de aplicativo usando React Navigation e API REST.
      </Text>

      <Button
        title="Ir para detalhes"
        onPress={() => navigation.navigate("Details")}
      />
    </SafeAreaView>
  );
}

function DetailsScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Tela de Detalhes</Text>

      <Text style={styles.text}>
        Nesta tela temos os botões para navegar entre as páginas.
      </Text>

      <View style={styles.buttonArea}>
        <Button
          title="Listar filmes"
          onPress={() => navigation.navigate("Movies")}
        />
      </View>

      <View style={styles.buttonArea}>
        <Button title="Voltar para Home" onPress={() => navigation.goBack()} />
      </View>
    </SafeAreaView>
  );
}

function MoviesScreen() {
  const [isLoading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");

  async function getMovies() {
    try {
      const response = await fetch("https://reactnative.dev/movies.json");
      const json = await response.json();

      setMovies(json.movies);
    } catch (err) {
      setError("Erro ao carregar os filmes.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <SafeAreaView style={styles.listContainer}>
      <Text style={styles.title}>Lista de Filmes</Text>

      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <FlatList
          data={movies}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.movieTitle}>{item.title}</Text>
              <Text style={styles.movieYear}>Ano: {item.releaseYear}</Text>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Início" }}
        />

        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{ title: "Detalhes" }}
        />

        <Stack.Screen
          name="Movies"
          component={MoviesScreen}
          options={{ title: "Filmes" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
  },

  listContainer: {
    flex: 1,
    padding: 24,
    backgroundColor: "#f5f5f5",
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },

  text: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 24,
  },

  buttonArea: {
    marginTop: 12,
    width: "80%",
  },

  card: {
    backgroundColor: "#ffffff",
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    elevation: 2,
  },

  movieTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },

  movieYear: {
    fontSize: 14,
    marginTop: 6,
  },

  error: {
    color: "red",
    textAlign: "center",
    fontSize: 16,
  },
});