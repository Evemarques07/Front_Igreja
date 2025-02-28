import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../services/api"; // Importe a instância da API

const HomeScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [idMembro, setIdMembro] = useState("");
  const [cargo, setCargo] = useState("");

  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        const storedNomeCompleto = await AsyncStorage.getItem("nomeCompleto");
        const storedIdMembro = await AsyncStorage.getItem("idMembro");
        const storedCargo = await AsyncStorage.getItem("cargo");

        setNomeCompleto(storedNomeCompleto || "Não encontrado");
        setIdMembro(storedIdMembro || "Não encontrado");
        setCargo(storedCargo || "Não encontrado");
      } catch (error) {
        console.error("Erro ao carregar informações do usuário:", error);
      }
    };

    loadUserInfo();
  }, []);

  const handleMenuClick = (menuItem) => {
    switch (menuItem) {
      case "Contribuições":
        navigation.navigate("Contribuicoes"); // Substitua 'Contribuicoes' pelo nome da sua rota
        break;
      case "Departamentos":
        navigation.navigate("Departamentos"); // Substitua 'Departamentos' pelo nome da sua rota
        break;
      case "Projetos":
        navigation.navigate("Projetos"); // Substitua 'Projetos' pelo nome da sua rota
        break;
      case "Relatórios Financeiros":
        navigation.navigate("RelatoriosFinanceiros"); // Substitua 'RelatoriosFinanceiros' pelo nome da sua rota
        break;
      default:
        Alert.alert("Erro", "Opção inválida.");
        break;
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      // Limpar os tokens e informações do usuário do AsyncStorage
      await AsyncStorage.removeItem("accessToken");
      await AsyncStorage.removeItem("tokenType");
      await AsyncStorage.removeItem("nomeCompleto");
      await AsyncStorage.removeItem("idMembro");
      await AsyncStorage.removeItem("cargo");

      // Navegar de volta para a tela de Login
      navigation.navigate("Login");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      Alert.alert("Erro", "Ocorreu um erro ao fazer logout. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo(a), {nomeCompleto}!</Text>
      <Text style={styles.cargoText}>{cargo.toUpperCase()}</Text>

      <Text style={styles.menuTitle}>Menu Principal</Text>

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => handleMenuClick("Contribuições")}
      >
        <Text style={styles.menuItemText}>Contribuições</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => handleMenuClick("Departamentos")}
      >
        <Text style={styles.menuItemText}>Departamentos</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => handleMenuClick("Projetos")}
      >
        <Text style={styles.menuItemText}>Projetos</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => handleMenuClick("Relatórios Financeiros")}
      >
        <Text style={styles.menuItemText}>Relatórios Financeiros</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.logoutButtonText}>Logout</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  cargoText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textTransform: "uppercase",
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 15,
  },
  menuItem: {
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 15,
    width: "80%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuItemText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  logoutButton: {
    backgroundColor: "red",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 5,
    marginTop: 20,
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default HomeScreen;
