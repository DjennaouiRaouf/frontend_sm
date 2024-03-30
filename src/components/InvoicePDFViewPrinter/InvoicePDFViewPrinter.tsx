import * as React from "react";
import {Navigate, useLocation, useNavigate, useParams, useSearchParams} from "react-router-dom";
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
import {Humanize} from "../Utils/Utils";
import axios from "axios";
import Cookies from "js-cookie";
type PDFViewPrinterProps = {
  //
};


const InvoicePDFViewPrinter: React.FC<any> = () => {
  const [searchParams] = useSearchParams();
  const { mid,fid } = useParams();
  const [facture,setFacture]=useState<any>({})
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

  const getPreviousDate = (dateString: string): Date => {
    const currentDate = new Date(dateString);
    if (isNaN(currentDate.getTime())) {
      throw new Error('Invalid date string');
    }

    // Calculate the previous date
    const previousDate = new Date(currentDate);
    previousDate.setDate(previousDate.getDate() - 1);
    return previousDate;
  };

  const[h,setH]=useState<string>("");
  const[f,setF]=useState<string>("");
  const getH = async() => {
    await axios.get(`${process.env.REACT_APP_API_BASE_URL}/sm/optionimpression/?type=H`,{
      headers: {
        Authorization: `Token ${Cookies.get('token')}`,
        'Content-Type': 'application/json',

      },
    })
        .then((response:any) => {

          if(response.data){

            setH(response.data[0].src)
          }
          else{
            setH("")
          }



        })
        .catch((error:any) => {

        });
  }
  const getF = async() => {
    await axios.get(`${process.env.REACT_APP_API_BASE_URL}/sm/optionimpression/?type=F`,{
      headers: {
        Authorization: `Token ${Cookies.get('token')}`,
        'Content-Type': 'application/json',

      },
    })
        .then((response:any) => {

          if(response.data){

            setF(response.data[0].src)
          }
          else{
            setF("")
          }



        })
        .catch((error:any) => {

        });
  }


  const getFacture = async() => {
    await axios.get(`${process.env.REACT_APP_API_BASE_URL}/sm/getfacture/?marche=${mid}&numero_facture=${fid}`,{
      headers: {
        Authorization: `Token ${Cookies.get('token')}`,
        'Content-Type': 'application/json',

      },
    })
        .then((response:any) => {
          setFacture(response.data[0])
        })
        .catch((error:any) => {
        });

  }


  useEffect(() => {
    getH();
    getF();
    getFacture();
  },[]);

  const date_facture = () => {
    const currentDate = new Date();
    const yearString = currentDate.getFullYear().toString();
    const monthString = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const dayString = currentDate.getDate().toString().padStart(2, '0');
    return`${yearString}-${monthString}-${dayString}`;
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
            <Document>
              <Page size="A4" style={{padding:1,margin:1,fontSize:8}} >
                {

                  selectedOption === "1" ?
                      h &&
                      <Image source={h}
                             style={{ width: '100%',height:110 ,position:"relative",top:0}} />
                      :
                      <View
                          style={{ width: '100%',height:110 ,position:"relative",top:0}} />


                }


                <View style={{margin:10}}>
                  <Text style={{ position: "absolute",right: 45,textDecoration: 'underline', }}>{`Facture N° : ${facture.numero_facture}`}</Text>
                  <Text style={{ position: "absolute",left: 10}}>{`Le: ${date_facture()}`}</Text>
                </View>

                <View style={{margin:20,width:'500px',height:'auto'}} wrap={true}>
                  <Text style={{ position: "relative",marginBottom:15,width:500}}>Situation des traveaux N°: {facture.num_situation}</Text>
                  <Text style={{ position: "relative",marginBottom:5,width:500}} wrap={true}><Text style={{textDecoration: 'underline',  fontWeight:100}}>Projet</Text> : {facture.projet}</Text>
                  <Text style={{ position: "relative",marginBottom:5,width:500}}><Text style={{textDecoration: 'underline', }}>Objet</Text> : {facture.lib_nt}</Text>
                  <View style={{ borderBottomColor: 'black', borderBottomWidth: 1,width: '100%',marginTop: 5,marginBottom:5,}} />
                  <Text style={{ position: "relative",marginBottom:5,width:500}}><Text style={{textDecoration: 'underline', }}>Marché</Text> : {facture.code_contrat} du {facture.signature} d'un montant de {Humanize(facture.montant_marche)} DA en HT</Text>
                  <Text style={{ position: "relative",marginBottom:5,width:500}}><Text style={{textDecoration: 'underline', }}>REF</Text> : Pole : {facture.pole}    NT : {facture.num_travail}   {facture.lib_nt}       Code Client : {facture.client}
                  </Text>
                  <View style={{ borderBottomColor: 'black', borderBottomWidth: 1,width: '100%',marginTop: 5,marginBottom:5,}} />


                </View>

                <View style={{margin:20,width:'500px',height:'auto'}} wrap={true}>
                  <Text style={{ position: "relative",width:500 ,marginBottom:10}} wrap={true}><Text>Selon la situation N°</Text>{`  du  ${facture.du }  au  ${facture.au }`}</Text>
                  <Text style={{ position: "relative",width:500,marginBottom:8}} wrap={true}>{`Montant cumulé des traveaux réalisés au ${facture.au } en (HT)      ${Humanize(facture.montant_cumule)} DA `   }  </Text>

                  <Text style={{ position: "relative",width:500,marginBottom:8}} wrap={true}>{`Montant cumulé précédemment des traveaux réalisés au ${facture.du } en (HT)      ${Humanize(facture.montant_precedent)} DA `   }  </Text>


                  <Text style={{ position: "relative",width:500,marginBottom:8}} wrap={true}>{`Montant cumulé des traveaux réalisés du  ${facture.du}  au  ${facture.au }  en (HT)     ${Humanize(facture.montant)} DA `   }  </Text>

                  <Text style={{ position: "relative",width:500,marginBottom:8}} wrap={true}>{`RG : ${facture.retenue_garantie}%     Montant de retenue de garantie en (HT)  ${Humanize(facture.montant_rg)} DA `   }  </Text>
                  <Text style={{ position: "relative",width:500,marginBottom:8}} wrap={true}>{`Taux de rabais : ${facture.rabais}%    Montant du rabais en (HT) :   ${Humanize(facture.montant_rb)} DA `   }  </Text>
                  <Text style={{ position: "relative",width:500,marginBottom:8}} wrap={true}>{`TVA : ${facture.tva}%    Montant de la taxe  ${Humanize((facture.tva/100)*facture.montant)} DA `   }  </Text>


                  {
                    (facture.montant_ava_remb  || facture.montant_avf_remb ) &&
                      <Text style={{ position: "relative",width:500,marginBottom:8 ,textAlign:"center",fontWeight:'bold'}} wrap={true}>{`( Déduire )`}  </Text>
                  }
                  {
                      facture.montant_avf_remb &&
                      <Text style={{ position: "relative",width:500,marginBottom:8}} wrap={true}>{`Avance Forfaitaire : ${Humanize(facture.montant_avf_remb)} DA `   }  </Text>

                  }
                  {
                      facture.montant_ava_remb &&
                      <Text style={{ position: "relative",width:500,marginBottom:8}} wrap={true}>{`Avance sur Appros : ${Humanize(facture.montant_ava_remb)} DA `   }  </Text>


                  }
                  {
                      facture.tva === "0.00" &&
                      <Text style={{ position: "relative",width:500,marginBottom:8 ,textAlign:"center"
                        ,fontWeight:'bold'}} wrap={true}>{`( EXONEREE DES TAXES )`}  </Text>
                  }

                  <Text style={{ position: "relative",width:500,marginTop:8,marginBottom:8 ,backgroundColor:"#e6e6e6"}} wrap={true}>{`MONTANT DE LA FACTURE EN (HT)      ${Humanize(facture.montant_factureHT)} DA `   }  </Text>
                  <Text style={{ position: "relative",width:500,marginBottom:8 ,backgroundColor:"#e6e6e6"}} wrap={true}>{`MONTANT NET À PAYER À L'ENTREPRISE EN (TTC)      ${Humanize(facture.montant_factureTTC)} DA `   }  </Text>


                </View>



                <View style={{margin:20,width:'500px',height:'auto'}} wrap={true}>
                  <Text style={{ position: "relative",width:500 ,backgroundColor:"#e6e6e6"}} wrap={true}><Text>Arretée la présente facture à la somme de</Text>{' : \n\n'+ facture.somme}</Text>

                </View>
                <View style={{margin:10}}>
                  <Text style={{ position: "absolute",right: 45 }}>{`P/ Le Président Directeur Général`}</Text>


                </View>
                <View style={{margin:10}}>
                  <Text style={{ position: "absolute",right: 45 }}>{`Le directeur des Finances et de la Comptabilité P/I`}</Text>


                </View>



                {
                  selectedOption === "1" ?
                        f &&
                      <Image source={f}
                             style={{ width: '100%',height:85, position:"absolute",bottom:20,right:1 }} />

                      :
                      <View
                          style={{ width: '100%',height:56, position:"absolute",bottom:15,right:1 }} />


                }
              </Page>
            </Document>

          </PDFViewer>
        </div>

      </>



  );
};

export default InvoicePDFViewPrinter;
