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
import {ChangeEvent, useEffect, useState} from "react";
import Form from 'react-bootstrap/Form';
type PDFViewPrinterProps = {
  //
};


const InvoicePDFViewPrinter: React.FC<any> = () => {
  const location = useLocation();
  const facture  = location.state.facture;
  interface Option {
    value: string;
    label: string;
  }

// List of options
  const options: Option[] = [
    { value: '1', label: 'Imprimer sur du papier blanc' },
    { value: '0', label: 'Imprimer sur du papier à entête' },
  ];

  const navigate = useNavigate();

  const styles = StyleSheet.create({
  });

  const [selectedOption, setSelectedOption] = useState<string>('1');

  // Event handler for option change
  const handleOptionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;

    setSelectedOption(selectedValue);
  };
  useEffect(() => {
  },[selectedOption]);

  const MyDocument = () => {

    return (
    <Document>
      <Page size="A4" style={{padding:1,margin:1,fontSize:8}} >
        {
           selectedOption === "1" ?
               <Image src={"http://127.0.0.1:8000/media/Images/Impression/groupe_header.png"}
                      style={{ width: '100%',height:110 ,position:"relative",top:0}} />
               :
               <View
                      style={{ width: '100%',height:110 ,position:"relative",top:0}} />


        }


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



        {
          selectedOption === "1" ?
              <Image src={"http://127.0.0.1:8000/media/Images/Impression/groupe_footer.png"}
                     style={{ width: '100%',height:85, position:"absolute",bottom:20,right:1 }} />
              :
              <View
                     style={{ width: '100%',height:56, position:"absolute",bottom:15,right:1 }} />


        }
        </Page>
    </Document>

    );
    
  }

  return (
      <>
        <div className="container text-center mb-3" >
          <Form.Select aria-label="Default select example" style={{width:"100%"}} onChange={handleOptionChange} >
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
            ))}
          </Form.Select>
        </div>

        <div>
          <PDFViewer style={{width:"100%",height:"810px"}}>
            <MyDocument  />
          </PDFViewer>
        </div>
      </>
  );
};

export default InvoicePDFViewPrinter;
