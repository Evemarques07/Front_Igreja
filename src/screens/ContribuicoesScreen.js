import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../services/api";

const ContribuicoesScreen = () => {
  const [contribuicoes, setContribuicoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [idMembro, setIdMembro] = useState("");

  useEffect(() => {
    const loadIdMembro = async () => {
      try {
        const storedIdMembro = await AsyncStorage.getItem("idMembro");
        if (storedIdMembro) {
          setIdMembro(storedIdMembro);
        } else {
          setError("ID do membro não encontrado.");
          Alert.alert(
            "Erro",
            "ID do membro não encontrado. Faça login novamente."
          );
        }
      } catch (e) {
        setError("Erro ao carregar ID do membro.");
        Alert.alert("Erro", "Erro ao carregar ID do membro. Tente novamente.");
      }
    };

    loadIdMembro();
  }, []);

  useEffect(() => {
    const fetchContribuicoes = async () => {
      if (!idMembro) return;

      setLoading(true);
      setError(null);

      try {
        console.log(
          `Iniciando requisição GET para /dizimos/membro/${idMembro}`
        );
        const response = await api.get(
          // Use api.get em vez de axios.get
          `/dizimos/membro/${idMembro}?skip=0&limit=100`
        );
        console.log("Resposta da API:", response.data);
        setContribuicoes(response.data);
      } catch (e) {
        console.error("Erro ao buscar contribuições:", e);
        setError("Erro ao buscar contribuições.");
        Alert.alert("Erro", "Erro ao buscar contribuições. Tente novamente.");
      } finally {
        setLoading(false);
      }
    };

    fetchContribuicoes();
  }, [idMembro]); // Executa quando o ID do membro é carregado

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const renderItem = ({ item }) => (
    <View style={styles.listItem}>
      <Text style={styles.listItemText}>Referência: {item.referencia}</Text>
      <Text style={styles.listItemText}>
        Data: {formatDate(item.dataRegistro)}
      </Text>
      <Text style={styles.listItemText}>Valor: {item.valor}</Text>
      <Text style={styles.listItemText}>Obs: {item.observacao}</Text>
      {/* Adicione outros campos que você quer exibir */}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Suas Contribuições</Text>
      {error && <Text style={styles.errorText}>{error}</Text>}
      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <FlatList
          data={contribuicoes}
          renderItem={renderItem}
          keyExtractor={(item) => item.idDizimo.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f0f0",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
  },
  listItem: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
  },
  listItemText: {
    fontSize: 16,
  },
});

export default ContribuicoesScreen;
