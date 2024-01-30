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
type PDFViewPrinterProps = {
    //
};


const AttachementPDFViewPrinter: React.FC<any> = () => {
    const location = useLocation();
    const[dataSet,setDataSet]=useState<any[]>([])
    const data  = location.state.params;
    const styles = StyleSheet.create({
        page: {
            flexDirection: 'row',
            backgroundColor: '#FFFFFF',
            fontSize:16

        },
        mainView:{

            width:'100vw',
            margin:20,
        },
        header:{
            fontSize:13,
            flexDirection: 'row',
            width:'100%',
            marginBottom:20
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
            fontSize:13,

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
            fontSize:16,
            padding:10,
            height:45,
            width:'70%',
            textAlign:"center",
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


            })
            .catch((error:any) => {

            });
    }


    useEffect(() => {
        getDataSet();
    },[]);

    return (
        <>
           

            <div>
                <PDFViewer style={{width:"100%",height:"860px"}}>
                    <Document pageLayout="singlePage">

                        <Page size={"A3"} orientation={'landscape'} style={styles.page} wrap={false} >
                            <View style={styles.mainView} >


                                <View style={styles.header} >
                                    <View style={styles.headerLeftPart} >
                                        <View style={{width:"50%"}} >
                                            <Text >{`Client : `}</Text>
                                            <Text >{`Projet : `}</Text>
                                            <Text >{`Objet : `}</Text>
                                            <Text >{`Contrat : `}</Text>
                                            <Text >{`NT : `}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.headerRightPart} >
                                        <Text >{`logo`}</Text>

                                    </View>
                                </View>


                                <View style={styles.center} >
                                <View style={styles.title} >
                                    <Text >{`Décompte provisoir des traveaux du ${getMonthName(data.month).toUpperCase()} / ${data.year}`}</Text>
                                </View >
                                </View >

                                <View style={styles.date} >
                                    <Text >{`Arrêté au 31/03/2023 `}</Text>
                                </View >

                                <Table
                                    data={dataSet}
                                >
                                    <TableHeader>
                                        <TableCell>
                                            Code Tache
                                        </TableCell>
                                        <TableCell>
                                            Designation
                                        </TableCell>
                                        <TableCell>
                                            Unité
                                        </TableCell>

                                    </TableHeader>
                                    <TableBody>
                                        <DataTableCell getContent={(r) => r.code_tache}/>
                                        <DataTableCell getContent={(r) => r.libelle_tache}/>
                                        <DataTableCell getContent={(r) => r.unite}/>


                                    </TableBody>
                                </Table>



                            </View>



                        </Page>

                    </Document>
                </PDFViewer>
            </div>
        </>
    );
};

export default AttachementPDFViewPrinter;



