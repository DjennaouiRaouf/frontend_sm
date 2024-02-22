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
import Form from "react-bootstrap/Form";
import {DataTableCell, Table, TableBody, TableCell, TableHeader} from "@alex9923/react-pdf-table";
import axios from "axios";
import Cookies from "js-cookie";
import {Humanize} from "../Utils/Utils";
type PDFViewPrinterProps = {
    //
};


const AttachementPDFViewPrinter: React.FC<any> = () => {
    const location = useLocation();
    const[dataSet,setDataSet]=useState<any[]>([]);
    const[logo,setLogo]=useState<string>("");
    const[loading,setLoading]=useState(true);
    const[extra,setExtra]=useState<any>({});
    const data  = location.state.params;
    const is_att = location.state.is_att;
    const styles = StyleSheet.create({
        page: {
            flexDirection: 'row',
            backgroundColor: '#FFFFFF',
            fontSize:12,
            paddingTop:'2cm',
            paddingBottom:'2cm',
            paddingLeft:'2cm',
            paddingRight:'2cm',

        },
        mainView:{

            width:'100vw',

        },
        header:{
            fontSize:12,
            flexDirection: 'row',
            width:'100%',
            paddingBottom:20,

        },
        headerLeftPart:{
            width:'80%',


        },
        headerRightPart:{
            width:'20%',


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

        },
        table1:{
            paddingTop:5
        },
        table2:{
            paddingTop:5
        },
        footer1:{
            paddingTop:2,
            width:'100%',
            height:"20vh",
            flexDirection: 'row',

        },
        footer2:{
            width:'100%',

            height:"30vh",
            flexDirection: 'row',
            position:"relative",
            bottom: -10,


        },
        footerLeftPart:{
            width:'100%',
            height:"30vh",

        },
        footerRightPart:{
            width:'50%',
            height:"30vh",
        },
        pageNumber: {
            position: 'absolute',
            fontSize: 12,
            bottom: 30,
            left: 0,
            right: 0,
            textAlign: 'center',
            color: 'grey',
        },

    });
    const getMonthName = (monthNumber: number) => {
        if (monthNumber >= 1 && monthNumber <= 12) {
            const monthName = new Intl.DateTimeFormat('fr', { month: 'long' }).format(new Date(2022, monthNumber - 1, 1));
            return monthName;
        } else {
            return 'Invalid month number';
        }
    }

    const getDataSet = async() => {
        await axios.get(`${process.env.REACT_APP_API_BASE_URL}/sm/getatt/?marche=${data.marche}&mm=${data.month}&aa=${data.year}`,{
            headers: {
                Authorization: `Token ${Cookies.get('token')}`,
                'Content-Type': 'application/json',

            },
        })
            .then((response:any) => {

                setDataSet(response.data.attachement)
                setExtra(response.data.extra)
                setLoading(false);



            })
            .catch((error:any) => {

            });
    }

    const getLogo = async() => {
        await axios.get(`${process.env.REACT_APP_API_BASE_URL}/sm/optionimpression/?type=L`,{
            headers: {
                Authorization: `Token ${Cookies.get('token')}`,
                'Content-Type': 'application/json',

            },
        })
            .then((response:any) => {

                if(response.data){

                    setLogo(response.data[0].src)
                }
                else{
                    setLogo("")
                }



            })
            .catch((error:any) => {

            });
    }

    useEffect(() => {
        getDataSet();
        console.log(is_att)

    },[]);
    useEffect(() => {
        getLogo();
    },[]);

    return (
        <>
            {
                loading === false  ?
                <div>
                    <PDFViewer style={{width:"100%",height:"800px"}}>
                        <Document pageLayout={"twoPageLeft"}  >

                            <Page size={"A3"} orientation={'landscape'} style={styles.page}   >
                                <View style={styles.mainView}   >


                                    <View style={styles.header}  >
                                        <View style={styles.headerLeftPart} >
                                            <View style={{width:"50%"}} >
                                                <Text style={{fontSize:10,paddingBottom:5}}  ><Text style={{textDecoration:"underline"}} >Client : </Text>{extra.client}</Text>
                                                <Text style={{fontSize:10,paddingBottom:5}} ><Text style={{textDecoration:"underline"}}  >Projet : </Text>{extra.projet}</Text>
                                                <Text style={{fontSize:10,paddingBottom:5}} ><Text style={{textDecoration:"underline"}}  >Objet : </Text>{extra.objet}</Text>
                                                <Text style={{fontSize:10,paddingBottom:5}} ><Text style={{textDecoration:"underline"}} >Contrat : </Text>{extra.contrat+" du "+extra.du}</Text>
                                                <Text style={{fontSize:10}} ><Text  >NT : </Text>{extra.nt}</Text>
                                            </View>
                                        </View>


                                            <View style={styles.headerRightPart} >
                                            {
                                                logo &&
                                                <Image source={logo} style={{width:"130px",height:"80px"}} />
                                            }


                                        </View>
                                    </View>


                                    <View style={styles.center} >
                                        <View style={styles.title} >

                                            {is_att === false &&

                                                <Text >{`Décompte provisoir de la situation N° ${extra.num_situation}`}</Text>
                                            }
                                            {is_att === true &&

                                                <Text >{`Attachement des traveaux de la situation N° ${extra.num_situation}`}</Text>
                                            }

                                        </View >
                                    </View >

                                    <View style={styles.date} >
                                        <Text >{`Arrêté au 31/03/2023 `}</Text>
                                    </View >

                                    <View   >
                                        <View style={styles.table1} >
                                            <Table
                                                data={dataSet}
                                            >
                                                <TableHeader textAlign={"center"} >
                                                    <TableCell >
                                                        Code Tache
                                                    </TableCell>
                                                    <TableCell >
                                                        Designation
                                                    </TableCell>
                                                    <TableCell >
                                                        Unité
                                                    </TableCell>
                                                    <TableCell>
                                                        Quantité Précédente
                                                    </TableCell>
                                                    <TableCell style={{backgroundColor:"#e6e6e6",borderColor:"#000000"}}>
                                                        Quantité Mois
                                                    </TableCell>
                                                    <TableCell>
                                                        Quantité Cumulée
                                                    </TableCell>
                                                    {is_att === false &&

                                                        <TableCell>
                                                            Prix Unitaire
                                                        </TableCell>
                                                    }
                                                    {is_att === false &&

                                                        <TableCell>
                                                        Montant Précédent
                                                        </TableCell>
                                                    }

                                                    {is_att === false &&

                                                        <TableCell style={{backgroundColor:"#e6e6e6",borderColor:"#000000"}}>
                                                        Montant Mois
                                                        </TableCell>
                                                    }
                                                    {is_att === false &&

                                                        <TableCell>
                                                        Montant Cumulé
                                                        </TableCell>
                                                    }
                                                </TableHeader>
                                                <TableBody textAlign={"center"}>
                                                    <DataTableCell  getContent={(r) => r.code_tache}/>
                                                    <DataTableCell  getContent={(r) => r.libelle_tache}/>
                                                    <DataTableCell  getContent={(r) => r.unite}/>
                                                    <DataTableCell getContent={(r) => r.qte_precedente}/>
                                                    <DataTableCell style={{backgroundColor:"#e6e6e6",borderColor:"#000000"}} getContent={(r) => r.qte_mois}/>
                                                    <DataTableCell getContent={(r) => r.qte_cumule}/>

                                                    {is_att === false &&

                                                        <DataTableCell getContent={(r) => Humanize(r.prix_u)}/>
                                                    }

                                                    {is_att === false &&

                                                        <DataTableCell getContent={(r) => Humanize(r.montant_precedent)}/>
                                                    }

                                                    {is_att === false &&

                                                        <DataTableCell style={{backgroundColor:"#e6e6e6",borderColor:"#000000"}} getContent={(r) => Humanize(r.montant_mois)}/>
                                                    }

                                                    {is_att === false &&

                                                        <DataTableCell getContent={(r) => Humanize(r.montant_cumule)}/>
                                                    }
                                                </TableBody>.
                                            </Table>
                                        </View >
                                        {is_att === false &&
                                            <View   style={styles.table2}>
                                                <Table
                                                    data={[extra]}

                                                >

                                                    <TableBody textAlign={"center"} >
                                                        <DataTableCell style={{borderRightColor:"white"}}  getContent={() => ""}/>
                                                        <DataTableCell style={{borderRightColor:"white"}}  getContent={() => ""}/>
                                                        <DataTableCell style={{borderRightColor:"white"}}  getContent={() => ""}/>
                                                        <DataTableCell style={{borderRightColor:"white"}}  getContent={() => ""}/>
                                                        <DataTableCell style={{borderRightColor:"white"}}  getContent={() => ""}/>
                                                        <DataTableCell style={{borderRightColor:"white"}}  getContent={() => ""}/>
                                                        <DataTableCell getContent={() => "Montant Total En (H.T)"}/>
                                                        <DataTableCell getContent={(r) => Humanize(r.smontant_precedent) }/>
                                                        <DataTableCell style={{backgroundColor:"#e6e6e6",borderColor:"#000000"}} getContent={(r) => Humanize(r.smontant_mois)}/>
                                                        <DataTableCell getContent={(r) => Humanize(r.smontant_cumule)}/>
                                                    </TableBody>.
                                                </Table>
                                            </View >
                                        }
                                    </View >

                                    {is_att === false &&

                                        <View style={styles.sum} >
                                            <Text >{`Le présent décompte est arrêté en HT à la somme de ${extra.mm}`}</Text>
                                        </View >
                                    }


                                    <View style={styles.footer2}>
                                        <View style={styles.footerLeftPart}>
                                            <Text >{`P/ ${extra.filiale}`}</Text>
                                        </View>
                                        <View style={styles.footerRightPart}>
                                            <View style={styles.footerLeftPart}>
                                                <Text >{`P/ ${extra.client}`}</Text>
                                            </View>
                                        </View>

                                    </View>

                                </View>
                                <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
                                    `${pageNumber} / ${totalPages}`
                                )} fixed />

                            </Page>

                        </Document>
                    </PDFViewer>
                </div>
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

export default AttachementPDFViewPrinter;



