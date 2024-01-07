import * as React from "react";
import {useLocation, useNavigate} from "react-router-dom";
import ReactPDF, {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink, PDFViewer,
} from "@react-pdf/renderer";
import Image = ReactPDF.Image;
import {useEffect, useState} from "react";
type PDFViewPrinterProps = {
  //
};

const InvoiceRGPDFViewPrinter: React.FC<any> = () => {
  const location = useLocation();

  const data  = location.state;
  const navigate = useNavigate();
  const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#FFFFFF',
      padding: 20,
    },
    title: {
      fontSize: 24,
      marginBottom: 10,
    },
    text: {
      fontSize: 12,
    },
  });

  console.log(data.extra)
  const MyDocument = () => {
    const [rgDate,setRgDate]=useState("");
    useEffect(() => {
      const currentDate = new Date();
      const yearString = currentDate.getFullYear().toString();
      const monthString = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
      const dayString = currentDate.getDate().toString().padStart(2, '0');
      setRgDate(`${yearString}-${monthString}-${dayString}`)
    },[]);
    return (
    <Document>
      <Page size="A4" style={{padding:10,margin:10,fontSize:9}} >
        <Image src={"https://th.bing.com/th/id/R.59efe8bb1965f3d0e0b67916e4df91cc?rik=3gnDGqTAQPT%2fLQ&riu=http%3a%2f%2fwww.conset-dz.com%2fwp-content%2fuploads%2f2016%2f07%2fcosider-1.jpg&ehk=n6dqllGHUv1aVfwTNtNrM6%2bKmcx6b963woAplJVffrI%3d&risl=&pid=ImgRaw&r=0"}
               style={{ width: '50%',height:60 ,marginTop:0 }} />
        <View style={{marginTop:50 ,marginBottom:20,marginLeft:10,marginRight:10}}>
        <View style={{margin:10}}>
          <Text style={{ position: "absolute",right: 45,textDecoration: 'underline', }}>{`Facture de Retenue de Garantie du Marche N° :  ${data.extra.code_contrat} `}</Text>
          <Text style={{ position: "absolute",left: 10}}>{`Le: ${rgDate}`}</Text>
        </View>

        <View style={{margin:20,width:'500px',height:'auto'}} wrap={true}>
          <Text style={{ position: "relative",marginBottom:5,width:500}} wrap={true}><Text style={{textDecoration: 'underline',  fontWeight:100}}>Projet</Text>{' : '+ data.extra.projet}</Text>
          <Text style={{ position: "relative",marginBottom:5,width:500}}><Text style={{textDecoration: 'underline', }}>Objet</Text>{`  :  ${data.extra.lib_nt}`}</Text>
          <View style={{ borderBottomColor: 'black', borderBottomWidth: 1,width: '100%',marginTop: 5,marginBottom:5,}} />
          <Text style={{ position: "relative",marginBottom:5,width:500}}><Text style={{textDecoration: 'underline', }}>Marché</Text>{`  :  ${data.extra.code_contrat} du ${data.extra.signature} d'un montant de ${data.extra.montant_marche}DA en HT`}</Text>
          <Text style={{ position: "relative",marginBottom:5,width:500}}><Text style={{textDecoration: 'underline', }}>REF</Text>{`  : Pole  : ${data.extra.pole}    NT : ${data.extra.nt}  ${data.extra.lib_nt}       Code Client : ${data.extra.client}`}
          </Text>
          <View style={{ borderBottomColor: 'black', borderBottomWidth: 1,width: '100%',marginTop: 5,marginBottom:5,}} />


        </View>


        <View style={{margin:20,width:'500px',height:'auto'}} >
          {data.factures.map((item:any, index:any) => (


                index === 0  ?
                  <Text key={index}style={{ position: "relative",width:500 ,marginBottom:10}} wrap={true}><Text>Selon la situation N°</Text>{` ${item.num_situation}  de la facture N°  ${item.numero_facture} le montant de la retenue de garantie s\'éleve à ${item.montant_rg}` }</Text>
                    :
                    <Text key={index}style={{ position: "relative",width:500 ,marginBottom:8}} wrap={true}><Text>Selon la situation N°</Text>{` ${item.num_situation}  de la facture N°  ${item.numero_facture} le montant de la retenue de garantie s\'éleve à ${item.montant_rg}` }</Text>


          ))}


        </View>


        <View style={{margin:10}}>
          <Text style={{ position: "relative",width:500,marginBottom:8}} wrap={true}>{`MONTANT Total des retenues de garanties   ${data.extra.total_rg} DA `   }  </Text>
        </View>

        <View style={{margin:20,width:'500px',height:'auto'}} wrap={true}>
          <Text style={{ position: "relative",width:500}} wrap={true}><Text>Arretée la présente facture à la somme de</Text>{' : \n\n'+ data.extra.total_rgl}</Text>
        </View>

        <View style={{marginTop:50,marginLeft:10,marginRight:10}}>
          <Text style={{ position: "absolute",right: 45 }}>{`P/ Le Président Directeur Général`}</Text>
        </View>
        <View style={{margin:10}}>
          <Text style={{ position: "absolute",right: 45 }}>{`Le directeur des Finances et de la Comptabilité P/I`}</Text>


        </View>



        </View>
        <Image src={"https://th.bing.com/th/id/R.59efe8bb1965f3d0e0b67916e4df91cc?rik=3gnDGqTAQPT%2fLQ&riu=http%3a%2f%2fwww.conset-dz.com%2fwp-content%2fuploads%2f2016%2f07%2fcosider-1.jpg&ehk=n6dqllGHUv1aVfwTNtNrM6%2bKmcx6b963woAplJVffrI%3d&risl=&pid=ImgRaw&r=0"}
               style={{ width: '50%',height:60, position:"absolute",bottom:20,marginTop:5 }} />
        </Page>
    </Document>
    );
    
  }
  return (
      <>
        <div>
          <PDFViewer style={{width:"100%",height:"860px"}}>
            <MyDocument  />
          </PDFViewer>
        </div>
      </>
  );
};

export default InvoiceRGPDFViewPrinter;
