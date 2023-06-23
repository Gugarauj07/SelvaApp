import React from 'react'
import { View,Text, Linking, TouchableOpacity, StyleSheet } from 'react-native'
import {
    Colors,
    StyledContainer,
    InnerContainer,
    TextLink,
} from "./../components/styles"

const About = () => {
  return (

      <StyledContainer>
          <InnerContainer>
              <Text>   Oi, somos 
              <Text style={{ color: 'blue', textDecorationLine: 'underline', fontStyle:'italic', fontWeight:'bold' }} onPress={() => {Linking.openURL('http://lattes.cnpq.br/3909691804095045')}}> Igor Ribeiro</Text> e 
              <Text style={{ color: 'blue', textDecorationLine: 'underline', fontStyle:'italic', fontWeight:'bold' }} onPress={() => {Linking.openURL('http://lattes.cnpq.br/5622102962091766')}}> Rodrigo Souza</Text>, e nós amamos tudo que
              envolve ciência, tecnologia e engenharia na área ambiental!</Text>
              <Text>   Como a ciência e a Amazônia são nossas paixões, desde 2012 
                  temos trabalhado com os impactos das queimadas da Amazônia e 
                  seus efeitos no ar e no clima, começando pelo uso do sensoriamento 
                  remoto por satélite para nossas pesquisas.</Text>
              <Text>   Entre 2015 e 2019, adicionamos as medidas em superfície e 
                  análises em laboratório, avançando nos estudos sobre os efeitos 
                  das queimadas da Amazônia na atmosfera. Fizemos análises, muitos 
                  gráficos, publicamos artigos científicos e, em 2020, decidimos 
                  aproximar a ciência da sociedade. Criamos a concepção das plataformas 
                  SELVA e EducAIR para serem dois dos nossos projetos principais com o 
                  objetivo de trazermos informações e conhecimentos para as pessoas sobre os 
                  problemas das queimadas, poluição do ar e mudanças climáticas, principalmente 
                  na Amazônia. Já sobre o SELVA, a concepção nasceu sem um nome, 
                  mas foi inspirada nos produtos da empresa PurpleAir, que fazem 
                  o monitoramento da poluição do ar em superfície. Nosso time 
                  criou nossos próprios códigos e sensores de baixo-custo, 
                  adicionamos serviços de terceiros, e assim nasceu o projeto 
                  (renomeado para SELVA alguns meses depois). Nosso objetivo é 
                  manter o SELVA vigilante e rápido, principalmente com os olhos 
                  na Amazônia.</Text>
                  <Text>...</Text>
          </InnerContainer>
      </StyledContainer>
  )
}

const styles = StyleSheet.create({
  aboutContainer: {
    display: "flex",
    alignItems: "center",
  },

  imgStyle: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  mainHeader: {
    fontSize: 18,
    color: "#344055",
    textTransform: "uppercase",
    fontWeight: "500",
    marginTop: 50,
    marginBottom: 10,
    fontFamily: "JosefinSans_700Bold",
  },
  paraStyle: {
    fontSize: 18,
    color: "#7d7d7d",
    paddingBottom: 30,
  },
  aboutLayout: {
    backgroundColor: "#4c5dab",
    paddingHorizontal: 30,
    marginVertical: 30,
  },
  aboutSubHeader: {
    fontSize: 18,
    color: "#fff",
    textTransform: "uppercase",
    fontWeight: "500",
    marginVertical: 15,
    fontFamily: "JosefinSans_700Bold",
    alignSelf: "center",
  },
  aboutPara: {
    color: "#fff",
  },
  menuContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },

  iconStyle: {
    width: "100%",
    height: 50,
    aspectRatio: 1,
  },
});


export default About