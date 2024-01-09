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

  interface Option {
    value: string;
    label: string;
  }

// List of options
  const options: Option[] = [
    { value: '1', label: 'Imprimer sur du papier blanc' },
    { value: '0', label: 'Imprimer sur du papier à entête' },
  ];

  const [selectedOption, setSelectedOption] = useState<string>('1');

  // Event handler for option change
  const handleOptionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;

    setSelectedOption(selectedValue);
  };
  useEffect(() => {
  },[selectedOption]);
  const MyDocument = () => {
    const [rgDate,setRgDate]=useState("");
    const [chunks,setChunks]=useState <any[]>([])
    const [chunkSize,setChunkSize]=useState <number>(4)

    const chunkArray = (array: any[], size: number) => {
      return Array.from({ length: Math.ceil(array.length / size) }, (v, index) =>
          array.slice(index * size, index * size + size)
      );
    };
    useEffect(() => {
      const currentDate = new Date();
      const yearString = currentDate.getFullYear().toString();
      const monthString = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
      const dayString = currentDate.getDate().toString().padStart(2, '0');
      setRgDate(`${yearString}-${monthString}-${dayString}`)


    },[]);
    useEffect(() => {
      console.log(data.factures.length)
      if(data.factures.length > chunkSize ){
        setChunks(chunkArray(data.factures,chunkSize))
        console.log(chunkArray(data.factures,chunkSize))
      }else{
        setChunks([])
      }
    },[]);




    return (
        <Document>
          {
            chunks.length > 0 ?
              chunks.map((chunk:any, chunks_index:any) => (
                   chunks_index === 0 ?
                    <Page key={chunks_index}size="A4" style={{padding:1,margin:1,fontSize:8}} >
                      {
                        selectedOption === "1" ?
                            <Image src={"http://127.0.0.1:8000/media/Images/Impression/groupe_header.png"}
                                   style={{ width: '100%',height:110 ,position:"relative",top:0}} />
                            :
                            <View
                                style={{ width: '100%',height:110 ,position:"relative",top:0}} />


                      }


                      <View style={{marginBottom:20,marginLeft:10,marginRight:10}}>
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
                          {chunk.map((item:any, index:any) => (


                              index === 0  ?
                                  <Text key={index}style={{ position: "relative",width:500 ,marginBottom:10}} wrap={true}><Text>Selon la situation N°</Text>{` ${item.num_situation}  de la facture N°  ${item.numero_facture} le montant de la retenue de garantie s\'éleve à ${item.montant_rg}` }</Text>
                                  :
                                  <Text key={index}style={{ position: "relative",width:500 ,marginBottom:8}} wrap={true}><Text>Selon la situation N°</Text>{` ${item.num_situation}  de la facture N°  ${item.numero_facture} le montant de la retenue de garantie s\'éleve à ${item.montant_rg}` }</Text>


                          ))}




                        </View>




                      </View>
                      <Image src={"http://127.0.0.1:8000/media/Images/Impression/groupe_footer.png"}
                             style={{ width: '100%',height:60, position:"absolute",bottom:"0.5cm",marginTop:5 }} />
                    </Page>
                    :
                       chunks_index > 0 && chunks_index < chunks.length-1 ?
                           <Page key={chunks_index}size="A4" style={{padding:1,margin:1,fontSize:8}} >
                             <Image src={"http://127.0.0.1:8000/media/Images/Impression/groupe_header.png"}
                                    style={{ width: '100%',height:110 ,position:"relative",top:-5}} />
                             <View style={{marginBottom:20,marginLeft:10,marginRight:10}}>

                               <View style={{margin:20,width:'500px',height:'auto'}} >
                                 {chunk.map((item:any, index:any) => (


                                     index === 0  ?
                                         <Text key={index}style={{ position: "relative",width:500 ,marginBottom:10}} wrap={true}><Text>Selon la situation N°</Text>{` ${item.num_situation}  de la facture N°  ${item.numero_facture} le montant de la retenue de garantie s\'éleve à ${item.montant_rg}` }</Text>
                                         :
                                         <Text key={index}style={{ position: "relative",width:500 ,marginBottom:8}} wrap={true}><Text>Selon la situation N°</Text>{` ${item.num_situation}  de la facture N°  ${item.numero_facture} le montant de la retenue de garantie s\'éleve à ${item.montant_rg}` }</Text>


                                 ))}




                               </View>




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
                           : chunks_index === chunks.length-1 &&
                           <Page key={chunks_index}size="A4" style={{padding:1,margin:1,fontSize:8}} >
                             <Image src={"http://127.0.0.1:8000/media/Images/Impression/groupe_header.png"}
                                    style={{ width: '100%',height:110 ,position:"relative",top:-5}} />
                             <View style={{marginBottom:20,marginLeft:10,marginRight:10}}>

                               <View style={{margin:20,width:'500px',height:'auto'}} >
                                 {chunk.map((item:any, index:any) => (
                                     index === 0  ?
                                         <Text key={index}style={{ position: "relative",width:500 ,marginBottom:10}} wrap={true}><Text>Selon la situation N°</Text>{` ${item.num_situation}  de la facture N°  ${item.numero_facture} le montant de la retenue de garantie s\'éleve à ${item.montant_rg}` }</Text>
                                         :
                                         <Text key={index}style={{ position: "relative",width:500 ,marginBottom:8}} wrap={true}><Text>Selon la situation N°</Text>{` ${item.num_situation}  de la facture N°  ${item.numero_facture} le montant de la retenue de garantie s\'éleve à ${item.montant_rg}` }</Text>


                                 ))}
                               </View>


                               <View style={{margin:20}}>
                                 <Text style={{ position: "relative",width:500,marginBottom:8}} wrap={true}>{`MONTANT Total des retenues de garanties   ${data.extra.total_rg} DA `   }  </Text>
                               </View>

                               <View style={{margin:20,marginBottom:5,width:'200px',height:'auto'}} wrap={true}>
                                 <Text style={{ position: "relative",width:200}} wrap={true}><Text>Arretée la présente facture à la somme de</Text>{' : \n\n'+ data.extra.total_rgl}</Text>
                               </View>

                               <View style={{marginTop:5,marginLeft:10,marginRight:10}}>
                                 <Text style={{ position: "absolute",right: 45 }}>{`P/ Le Président Directeur Général`}</Text>
                               </View>
                               <View style={{margin:10}}>
                                 <Text style={{ position: "absolute",right: 45 }}>{`Le directeur des Finances et de la Comptabilité P/I`}</Text>
                               </View>

                             </View>
                             <Image src={"http://127.0.0.1:8000/media/Images/Impression/groupe_footer.png"}
                                    style={{ width: '100%',height:60, position:"absolute",bottom:"0.5cm",marginTop:5 }} />
                           </Page>




              ))
            :
                chunks.length === 0 &&
                <Page size="A4" style={{padding:1,margin:1,fontSize:8}} >
                  {
                    selectedOption === "1" ?
                        <Image src={"http://127.0.0.1:8000/media/Images/Impression/groupe_header.png"}
                               style={{ width: '100%',height:110 ,position:"relative",top:0}} />
                        :
                        <View
                            style={{ width: '100%',height:110 ,position:"relative",top:0}} />


                  }

                  <View style={{marginBottom:20,marginLeft:10,marginRight:10}}>
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


                    <View style={{margin:20}}>
                      <Text style={{ position: "relative",width:500,marginBottom:8}} wrap={true}>{`MONTANT Total des retenues de garanties   ${data.extra.total_rg} DA `   }  </Text>
                    </View>

                    <View style={{margin:20,marginBottom:5,width:'200px',height:'auto'}} wrap={true}>
                      <Text style={{ position: "relative",width:200}} wrap={true}><Text>Arretée la présente facture à la somme de</Text>{' : \n\n'+ data.extra.total_rgl}</Text>
                    </View>

                    <View style={{marginTop:5,marginLeft:10,marginRight:10}}>
                      <Text style={{ position: "absolute",right: 45 }}>{`P/ Le Président Directeur Général`}</Text>
                    </View>
                    <View style={{margin:10}}>
                      <Text style={{ position: "absolute",right: 45 }}>{`Le directeur des Finances et de la Comptabilité P/I`}</Text>
                    </View>



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



          }

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
          <PDFViewer style={{width:"100%",height:"860px"}}>
            <MyDocument  />
          </PDFViewer>
        </div>
      </>
  );
};

export default InvoiceRGPDFViewPrinter;
