import * as React from "react";
import {useLocation, useNavigate} from "react-router-dom";
import ReactPDF, {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";
import Image = ReactPDF.Image;
import {ChangeEvent, useEffect, useState} from "react";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Cookies from "js-cookie";
import {showAlert, Variants} from "../../Redux-Toolkit/Slices/AlertSlice";
import {DataTableCell, Table, TableBody, TableCell, TableHeader} from "@alex9923/react-pdf-table";
import Humanize from "../Utils/Utils";
type PDFViewPrinterProps = {
  //
};

const EtatCTRLInvoicePDFViewPrinter: React.FC<any> = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState<string>('1');
  const [rgDate,setRgDate]=useState("");
  const[dataSet,setDataSet]=useState<any[]>([]);
  const[h,setH]=useState<string>("");
  const[f,setF]=useState<string>("");
  const[loading,setLoading]=useState(true);
  const[extra,setExtra]=useState<any>({});
  const mid=location.state
  const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#FFFFFF',
      fontSize:12,
      paddingTop:10,
      paddingBottom:150,
      paddingLeft:5,
      paddingRight:5,



    },
    mainView:{

      width:'100vw',

    },
    header:{
      flexDirection: 'row',
      width:'100%',
      paddingBottom:20,

      position:"relative",
      top:-5



    },
    headerDate:{
      flexDirection: 'row',
      width:'100%',
      paddingBottom:20,

      position:"relative",
      top:-10,
      justifyContent:'flex-end',

    },
    dataHeader:{
      width:"100%",
      paddingLeft:10,
      paddingRight:10


    },



    content:{
      paddingBottom:60,
    },
    date:{
      fontSize:12,

      width:'100%',
      textAlign:"right",
    },
    center:{
      width:'100%',
      justifyContent:"center",
      alignItems:"center",
    },
    title:{
      borderWidth:2,
      fontSize:12,
      padding:10,
      height:45,
      width:'70%',
      textAlign:"center",
    },
    sum:{

      width:"100%",
      fontSize:12,
      paddingTop:10,
      paddingLeft:10,
      paddingRight:10,

    },
    table1:{
      paddingTop:5
    },
    table2:{
      paddingTop:5
    },

    footer:{

      width:'100%',
      position: 'absolute',
      bottom: 2



    },

    pageNumber: {
      position: 'relative',
      fontSize: 12,
      paddingBottom:20,
      left: 0,
      right: 0,
      textAlign: 'center',
      color: 'grey',
    },

  });

  interface Option {
    value: string;
    label: string;
  }

  const options: Option[] = [
    { value: '1', label: 'Imprimer sur du papier blanc' },
    { value: '0', label: 'Imprimer sur du papier à entête' },
  ];


  const getDataSet = async() => {

    await axios.get(`${process.env.REACT_APP_API_BASE_URL}/sm/ecf/?marche=${mid.marche}`,{
      headers: {
        Authorization: `Token ${Cookies.get('token')}`,
        'Content-Type': 'application/json',

      },
    })
        .then((response:any) => {

            setDataSet(response.data.factures)
            setExtra(response.data.extra)
            setLoading(false)


        })
        .catch((error:any) => {
        });
  }

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

  const handleOptionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;

    setSelectedOption(selectedValue);
  };


  useEffect(() => {
  },[selectedOption]);

  useEffect(() => {
    const currentDate = new Date();
    const yearString = currentDate.getFullYear().toString();
    const monthString = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const dayString = currentDate.getDate().toString().padStart(2, '0');
    setRgDate(`${yearString}-${monthString}-${dayString}`)

  },[]);
  useEffect(() => {
    getDataSet();
  },[]);
  useEffect(() => {
    getH();
  },[]);

  useEffect(() => {
    getF();
  },[]);


  return (

      <>
        {
          loading === false  ?
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
                  <PDFViewer style={{width:"100%",height:"850px"}}>
                    <Document   >

                      <Page size={"A3"} orientation={'portrait'} style={styles.page}   >
                        <View style={styles.mainView}   >


                          <View style={styles.header}  fixed>
                            {h &&
                            <Image source={h} style={{width:"150%",height:102}} />
                            }
                          </View>
                          <View style={styles.headerDate}  >
                            <Text style={{fontSize:10,textAlign:"right",paddingTop:10,paddingLeft:10,paddingRight:10}} ><Text  >Le : </Text>{rgDate}</Text>

                          </View>
                          <View style={styles.header}    >

                            <View style={styles.dataHeader} >
                              <Text style={{fontSize:10,paddingBottom:5}}  ><Text style={{textDecoration:"underline"}} >Client</Text>  {extra.client}</Text>
                              <Text style={{fontSize:10,paddingBottom:5}} ><Text style={{textDecoration:"underline"}}  >Projet</Text>  {extra.projet}</Text>
                              <Text style={{fontSize:10,paddingBottom:5}} ><Text style={{textDecoration:"underline"}}  >Objet</Text>   {extra.objet}</Text>
                              <Text style={{fontSize:10,paddingBottom:5}} ><Text style={{textDecoration:"underline"}} >Contrat</Text>  {extra.code_contrat}</Text>
                              <Text style={{fontSize:10,paddingBottom:5}} ><Text style={{textDecoration:"underline"}} >Pole</Text>  {extra.pole}</Text>

                              <Text style={{fontSize:10}} ><Text  >NT : </Text>{extra.nt}</Text>
                            </View>


                          </View>
                          <View style={{paddingLeft:10,paddingRight:10}}  >
                            <View style={styles.table1} >
                              <Table
                                  data={dataSet.concat(dataSet)}

                              >
                                <TableHeader textAlign={"center"} >
                                  <TableCell>
                                    Facture N°
                                  </TableCell>
                                  <TableCell>
                                    Situation N°
                                  </TableCell>
                                  <TableCell>
                                    du
                                  </TableCell>
                                  <TableCell>
                                    au
                                  </TableCell>


                                  <TableCell>
                                    Montant RG
                                  </TableCell>

                                </TableHeader>
                                <TableBody textAlign={"center"}>
                                  <DataTableCell getContent={(r) => r.numero_facture}/>
                                  <DataTableCell getContent={(r) => r.num_situation}/>
                                  <DataTableCell getContent={(r) => r.du}/>
                                  <DataTableCell getContent={(r) => r.au}/>
                                  <DataTableCell getContent={(r) => Humanize(r.montant_rg)}/>
                                </TableBody>.
                              </Table>
                            </View >
                            <View   style={styles.table2}>
                              <Table
                                  data={[extra]}

                              >

                                <TableBody textAlign={"center"} >
                                  <DataTableCell style={{borderRightColor:"white"}}  getContent={() => ""}/>
                                  <DataTableCell style={{borderRightColor:"white"}}  getContent={() => ""}/>
                                  <DataTableCell style={{borderRightColor:"white"}}  getContent={() => ""}/>

                                  <DataTableCell getContent={() => "Montant Total R.G"}/>
                                  <DataTableCell style={{backgroundColor:"#e6e6e6"}} getContent={(r) => "" }/>
                                </TableBody>.
                              </Table>
                            </View >
                          </View >


                        </View>

                        <View style={styles.footer} fixed>
                          <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (

                              `${pageNumber} / ${totalPages}`
                          )} fixed />
                          {f &&
                          <Image source={f} style={{width:"100%",height:85}} />
                          }
                        </View>



                      </Page>

                    </Document>
                  </PDFViewer>
                </div>
              </>
              :
              <div className="container d-xl-flex justify-content-xl-center align-items-xl-center">
                      <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          style={{
                            width: 300,
                            height: 300,
                            margin: 0,
                            fontSize: 90,
                            color: "#dc162e"
                          }}
                      />
              </div>


        }


      </>


  );
};


export default EtatCTRLInvoicePDFViewPrinter;
