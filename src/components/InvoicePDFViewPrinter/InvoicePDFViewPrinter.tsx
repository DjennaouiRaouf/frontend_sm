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
type PDFViewPrinterProps = {
  //
};

const InvoicePDFViewPrinter: React.FC<any> = () => {
  const location = useLocation();
  const facture  = location.state.facture;
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
  console.log(facture)
  const MyDocument = () => {
    return (
    <Document>
      <Page size="A4" style={{padding:10,margin:10,fontSize:9}} >
        <Image src={"https://th.bing.com/th/id/R.59efe8bb1965f3d0e0b67916e4df91cc?rik=3gnDGqTAQPT%2fLQ&riu=http%3a%2f%2fwww.conset-dz.com%2fwp-content%2fuploads%2f2016%2f07%2fcosider-1.jpg&ehk=n6dqllGHUv1aVfwTNtNrM6%2bKmcx6b963woAplJVffrI%3d&risl=&pid=ImgRaw&r=0"}
               style={{ width: '50%',height:60 ,marginTop:0 }} />

        <View style={{margin:10}}>
          <Text style={{ position: "absolute",right: 45,textDecoration: 'underline', }}>{`Facture N° : ${facture.numero_facture}`}</Text>
          <Text style={{ position: "absolute",left: 10}}>{`Le: ${facture.date}`}</Text>
        </View>

          <View style={{margin:20,width:'500px',height:'auto'}} wrap={true}>
            <Text style={{ position: "relative",marginBottom:15,width:500}}>{`Situation des traveaux N°: ${facture.num_situation}`}</Text>
            <Text style={{ position: "relative",marginBottom:5,width:500}} wrap={true}><Text style={{textDecoration: 'underline',  fontWeight:100}}>Projet</Text>{' : '+ facture.projet}</Text>
            <Text style={{ position: "relative",marginBottom:5,width:500}}><Text style={{textDecoration: 'underline', }}>Objet</Text>{`  :  ${facture.lib_nt}`}</Text>
            <View style={{ borderBottomColor: 'black', borderBottomWidth: 1,width: '100%',marginTop: 5,marginBottom:5,}} />
            <Text style={{ position: "relative",marginBottom:5,width:500}}><Text style={{textDecoration: 'underline', }}>Marché</Text>{`  :  ${facture.code_contrat} du ${facture.signature} d'un montant de ${facture.montant_marche}DA en HT`}</Text>
            <Text style={{ position: "relative",marginBottom:5,width:500}}><Text style={{textDecoration: 'underline', }}>REF</Text>{`  : Pole  : ${facture.pole}    NT : ${facture.num_travail}  ${facture.lib_nt}       Code Client : ${facture.client}`}
            </Text>
            <View style={{ borderBottomColor: 'black', borderBottomWidth: 1,width: '100%',marginTop: 5,marginBottom:5,}} />


          </View>

        <View style={{margin:20,width:'500px',height:'auto'}} wrap={true}>
          <Text style={{ position: "relative",width:500 ,marginBottom:10}} wrap={true}><Text>Selon la situation N°</Text>{`  du  ${facture.du }  au  ${facture.au }`}</Text>
          <Text style={{ position: "relative",width:500,marginBottom:8}} wrap={true}>{`Montant cumulé des traveaux réalisés au ${facture.au }      ${facture.montant_cumule} DA `   }  </Text>

          <Text style={{ position: "relative",width:500,marginBottom:8}} wrap={true}>{`Montant cumulé des traveaux réalisés au ${facture.au }      ${facture.montant_precedent} DA `   }  </Text>


          <Text style={{ position: "relative",width:500,marginBottom:8}} wrap={true}>{`Montant cumulé des traveaux réalisés du  ${facture.du}  au  ${facture.au }      ${facture.montant_mois} DA `   }  </Text>

          <Text style={{ position: "relative",width:500,marginBottom:8}} wrap={true}>{`RG : ${facture.retenue_garantie}%     Montant de retenue de garantie   ${facture.montant_rg} DA `   }  </Text>
          <Text style={{ position: "relative",width:500,marginBottom:8}} wrap={true}>{`Taux de rabais : ${facture.rabais}%    Montant du rabais :   ${facture.montant_rb} DA `   }  </Text>
          <Text style={{ position: "relative",width:500,marginBottom:8}} wrap={true}>{`TVA : ${facture.tva}%    Montant de la taxe  ${facture.montant_taxe} DA `   }  </Text>

          {
              facture.tva === "0.00" &&
              <Text style={{ position: "relative",width:500,marginBottom:8 ,textAlign:"center"
              ,fontWeight:'bold'}} wrap={true}>{`( EXONEREE DES TAXES )`}  </Text>
          }
          <Text style={{ position: "relative",width:500,marginBottom:8}} wrap={true}>{`MONTANT NET A PAYER      ${facture.a_payer} DA `   }  </Text>


        </View>

        <View style={{margin:20,width:'500px',height:'auto'}} wrap={true}>
          <Text style={{ position: "relative",width:500}} wrap={true}><Text>Arretée la présente facture à la somme de</Text>{' : \n\n'+ facture.somme}</Text>

        </View>
        <View style={{margin:10}}>
          <Text style={{ position: "absolute",right: 45 }}>{`P/ Le Président Directeur Général`}</Text>


        </View>
        <View style={{margin:10}}>
          <Text style={{ position: "absolute",right: 45 }}>{`Le directeur des Finances et de la Comptabilité P/I`}</Text>


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

export default InvoicePDFViewPrinter;
