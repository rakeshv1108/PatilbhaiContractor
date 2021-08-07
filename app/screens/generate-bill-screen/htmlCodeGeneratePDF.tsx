export const generateHTML = (billDetails) => {
  return `<!DOCTYPE html>
<html lang="en">

<head>
    <title>Patilbhai Contractor</title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }

        body {
            size: 8in 9.25in;
            position: absolute;
            background-color: white;
            box-sizing: border-box;
            color: red;
            justify-content: center;
            align-items: center;
            flex: 1;
        }

        .mainContainer {
            position: relative;
            top: 10;
            left: 10;
            width: 8in;
            height: 9.25in;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
        }

        .getSection {
            color: red;
            font-size: 80%;
        }

        .originalSection {
            float: right;
            text-align: center;
            color: red;
            font-size: 80%;
        }

        .conatinerHeader {
            display: flex;
            flex-direction: row;
            width: 8in;
            justify-content: space-between;
            align-self: center;
        }

        .shreeGaneshSection {
            color: red;
            text-align: center;
            margin-left: -7%;
            font-size: 80%;
        }

        .panSection {
            background-color: red;
            color: white;
            margin-left: -5px;
            margin-right: -5px;
        }

        #redLine {
            border: 0.05px solid red;
            margin-top: 1px;
        }

        .detailContainer {
            display: flex;
            flex-direction: row;
            padding-bottom: 5px;
            border-bottom: 1px solid red;
        }

        .subContainerDetails {
            flex: 1;
            text-align: center;
            color: red;
            font-size: 173%;
        }

        #pcLogo {
            height: 15%;
            width: 15%;
            margin-top: 2px;
        }

        #crainlLogo {
            height: 15%;
            width: 15%;
            margin-top: 2px;
        }

        #farmTitleName {
            font-size: 190%;
        }

        #boilerTxt {
            font-size: 55%;
        }

        #machineryTxt {
            font-size: 70%;
        }

        .postAddContainer {
            color: red;
            display: flex;
            flex-direction: row;
            letter-spacing: 1px;
            width: 100%;
            font-size: 80%;
            padding-top: 3px;
        }

        @font-face {
             font-family: TimesNewRoman;
             src: url(${billDetails.greyHoundFontPath});
        }

        div.a {
            text-align: justify;
            -moz-text-align-last: right;
            text-align-last: right;
        }

        .columnClass {
            float: left;
            width: 75%;
            border: 1px solid red;
            border-top-width: 0px;
            font-size: 12px;
        }

        .row {
            display: flex;
            flex-direction: row;
            color: red;
        }

        #horizontalView {
            display: flex;
            flex-direction: row;
            width: 98%;
            justify-content: space-between;
            padding-left: 1%;
            margin-bottom: 0.5%;
        }

        #forPatil {
            display: flex;
            flex-direction: column;
            flex: 1;
            justify-content: space-between;
            text-align: center;
            border: 1px solid red;
            border-left-width: 0px;
            border-top-width: 0px;
        }

        #rupees {
            font-size: 15px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 1% 1% 1% 1%;
            margin-top: 0.5%;
            line-height: 0.7;
        }

        #bank {
            border-width: 0px;
            border-top-width: 1px;
            border-top-color: red;
            border-style: solid;
            padding-left: 1%;
        }

        #bankDetailSubContainer {
            display: flex;
            flex-direction: row;
            flex: 1;
            padding-left: 1%;
        }

        #detailKeys {
            margin-right: .5%;
        }

        #payableAmount {
            display: flex;
            flex-direction: row;
            width: 25%;
            border: 1px solid red;
            border-left-width: 0px;
            border-top-width: 0px;
            font-size: 20%;
        }

        #centerView {
            padding-top: 2.5%;
            padding-bottom: 2.5%;
            border-top-width: 1px;
            border-top-color: red;
            border-top-style: solid;
            border-right-width: 1px;
            font-size: 12px;
            justify-content: space-between;
        }

        #centerViewinGrandTotal {
            text-align: center;
            align-items: center;
            border-top-width: 1px;
            border-top-color: red;
            border-top-style: solid;
            font-size: 12px;
            border-right-width: 1px;
            justify-content: center;
            padding-top: 10%;
        }

        #totalTxt {
            padding-top: 2.5%;
            padding-bottom: 2.5%;
            border-right-width: 1px;
            font-size: 12px;
            margin-top: 5px;
            justify-content: space-between;
        }

        #totalTxtValue {
            padding-top: 2.5%;
            padding-bottom: 2.5%;
            border-right-width: 1px;
            margin-top: 5px;
            color: black;
            font-size: 12px;
            text-align: center;
            justify-content: space-between;
        }

        .subContainerPrices {
            flex-direction: column;
            width: 50%;
            border-right-width: 1px;
            border-right-color: red;
            font-size: 15px;
            border-right-style: solid;
        }

        .subContainerValues {
            flex-direction: column;
            width: 50%;
            border-right-width: 0px;
            text-align: center;
            font-size: 15px;
            color: black;
            border-right-color: red;
            border-right-style: solid;
        }

        #rupeesLine {
            margin-left: 12%;
            border: 0.5px solid red;
            background-color: red;
        }

        .paddingLeft {
            padding-left: 1%;
        }

        .partyDetailContainer {
            /* background-color: salmon; */
            display: flex;
            color: red;
            font-size: 20%;
            flex-direction: row;
        }

        #partyPersonalDetailsView {
            width: 70%;
            border: 1px solid red;
            border-bottom-width: 0px;
            padding-left: 1%;
            padding-top: 0.7%;
            padding-right: 1%;
        }

        #partyNameKey {
            align-self: center;
            font-size: 15px;
        }

        #partyNameValue {
            color: black;
            font-weight: 'bold';
            font-size: 15px;
        }

        .commonPartyUnderLine {
            margin-left: 6%;
            margin-top: 1.2%;
            margin-bottom: 1%;
            border: 0.5px solid red;
            background-color: red;
        }

        .addressFirstUnderline {
            margin-left: 12%;
            margin-top: 1.2%;
            margin-bottom: 1%;
            border: 0.5px solid red;
            background-color: red;
        }

        .horizontalContainer {
            flex-direction: row;
            display: flex;
            align-items: center;
            font-size: 15px;
        }

        #extraPatyAddress {
            flex: 1;
            margin-top: 1.2%;
            margin-bottom: 1%;
            border: 0.5px solid red;
            background-color: red;
        }

        #verticalContainer {
            flex-direction: column;
            display: flex;
            flex: 0.5;
        }

        .stateUnderline {
            margin-left: 15%;
            margin-top: 1.2%;
            margin-bottom: 1%;
            border: 0.5px solid red;
            background-color: red;
        }

        .stateCodeUnderline {
            margin-left: 30%;
            margin-top: 1.2%;
            margin-bottom: 1%;
            border: 0.5px solid red;
            background-color: red;
        }

        #stateContainer {
            flex-direction: row;
            display: flex;
            margin-bottom: 2%;
            width: 100%;
        }

        #verticalContainer {
            display: flex;
            flex-direction: column;
        }

        #firstGSTNoBox {
            border: 1px solid red;
            width: 3%;
            justify-content: center;
            align-items: center;
            text-align: center;
            margin-bottom: 0.5%;
            font-size: 30%;
            color: black;
        }

        .gstNoBox {
            border: 1px solid red;
            border-left-width: 0px;
            width: 3%;
            font-size: 30%;
            color: black;
            justify-content: center;
            align-items: center;
            text-align: center;
            margin-bottom: 0.5%;
        }

        #txtGSTNo {
            margin-right: 1%;
            margin-bottom: 0.5%;
            font-size: 30%,
        }

        #billDetailView {
            display: flex;
            flex-direction: column;
            flex: 1;
            border: 1px solid red;
            border-left-width: 0px;
            border-bottom-width: 0px;
        }

        #rowWithBottomBorder {
            padding-top: 4%;
            padding-bottom: 4%;
            padding-left: 2%;
            border-bottom: 1px solid red;
            display: flex;
            flex-direction: row;
            color: red;
        }

        #serviceTxt {
            flex-direction: row;
            display: flex;
            justify-content: center;
            margin-top: 2%;
            flex: 1;
        }

        #serviceUnderline {
            margin: 0.2% 2% 0.5% 2%;
            border: 0.5% solid red;
        }

        #supplyPlaceName {
            margin-bottom: 1%;
            margin-top: 2%;
            font-size: 15px;
        }

        .serviceDetailContainer {
            width: 100%;
            height: 4.4in;
            font-size: 15px;
        }

        .serviceSubContainer_SRNO {
            display: flex;
            flex-direction: column;
            width: 5%;
            height: 4.4in;
            align-self: flex-start;
            border: 1px solid red;
            border-right-width: 0px;
        }

        .serviceSubContainer_DES {
            display: flex;
            flex-direction: column;
            width: 60%;
            height: 4.4in;
            align-self: flex-start;
            border: 1px solid red;
            border-right-width: 0px;
        }

        .serviceSubContainer_HSN {
            display: flex;
            flex-direction: column;
            width: 20%;
            height: 4.4in;
            align-self: flex-start;
            border: 1px solid red;
            border-right-width: 0px;
        }

        .serviceSubContainer_QUANTITY {
            display: flex;
            flex-direction: column;
            width: 15%;
            height: 4.4in;
            align-self: flex-start;
            border: 1px solid red;
            border-right-width: 0px;
        }

        #srNoTxt {
            justify-content: center;
            text-align: center;
            color: red;
            width: 100%;
            border-bottom: 1px solid red;
            height: 10%;
            align-items: center;
            align-self: center;
            vertical-align: middle;
            font-size: 15px;
        }

        #srNoView {
            justify-content: center;
            text-align: center;
            color: black;
            margin-top: 5px;
            font-size: 15px;
        }

        #desTxt {
            justify-content: center;
            text-align: center;
            color: red;
            border-bottom: 1px solid red;
            height: 10%;
            align-items: center;
            vertical-align: middle;
            font-size: 15px;
        }

        #desView {
            display: flex;
            flex: 1;
        }

        #desOfGoods {
            margin-top: 5px;
            margin-left: 5px;
            color: black;
            font-size: 15px;
            flex-wrap: wrap;
            margin-right: 5px;
        }

        #hsnCode {
            flex: 1;
            margin-top: 5px;
            margin-left: 5px;
            color: black;
            font-size: 15px;
            flex-wrap: wrap;
            text-align: center;
            margin-right: 5px;
        }

        .serviceSubContainer_RATE {
            display: flex;
            flex-direction: column;
            width: 12%;
            height: 4.4in;
            align-self: flex-start;
            border: 1px solid red;
            border-right-width: 0px;
        }

        #rateRsPs {
            display: flex;
            /* border: 1px solid red; */
            width: 100%;
            justify-content: space-around;
        }

        #amountRsPs {
            display: flex;
            /* border: 1px solid red; */
            width: 100%;
            justify-content: space-around;
        }

        #verLineRate {
            justify-content: center;
            display: flex;
            flex: 1;
            flex-direction: row;
        }

        .serviceSubContainer_PER {
            display: flex;
            flex-direction: column;
            width: 8%;
            height: 4.4in;
            align-self: flex-start;
            border: 1px solid red;
            border-right-width: 0px;
        }

        .serviceSubContainerAMOUNT {
            display: flex;
            flex-direction: column;
            width: 20%;
            height: 4.4in;
            align-self: flex-start;
            border: 1px solid red;
            border-right-width: 1px;
        }
    </style>
</head>

<body>

    <div class="mainContainer">
    <!--------------------------------------------------- Header View--------------------------------------------------->
    <div class="conatinerHeader">
        <div class="getSection">
            <p>STATE-GUJARAT/CODE-24</p>
            <p>GSTIN : 24ALBPP8535D1ZB</p>
            <div class="panSection">
                <p> &nbsp; PAN NO. : ALBPP8535D</p>
                <p> &nbsp; VITTHALBHAI D. PATIL</p>
            </div>
        </div>
        <div class="shreeGaneshSection">
            <p>Shree Ganeshay Namah</p>
            <p>Tax Invoice Supply of Service</p>
            <hr id="redLine" />
        </div>
        <div class="originalSection">
            <p>Original</p>
            <p>M.: 9227233542</p>
            <p>M.: 9327071486</p>
        </div>
    </div>
    <div class="detailContainer">
        <img src="${
          billDetails.pcLogo
        }" style="height: 100px; width: 100px; background-color:'white'; margin-right: 20px" alt="pcLogo" id="pcLogo" /> 
        <div class="subContainerDetails">
            <p id="farmTitleName" style="font-size: 57px; font-family:TimesNewRoman;">Patilbhai Contractor</p>
            <p id="boilerTxt">Boiler Chimney, E.O.T. Craine, Tanki, Machinery, Electric, Furneese,</p>
            <p id="boilerTxt">(Crane Haire, Open D.C.M, Transport Sub.)</p>
            <b> <p id="machineryTxt">Machinery Loading Unloading Contractor</p> </b>
        </div>
        <img src="${
          billDetails.crainImage
        }" style="height: 100px; width: 100px" alt="crainLogo" id="crainlLogo" /> 
    </div>
    <div class="postAddContainer">
        <h4>Post Add. :</h4>
        <p> 3, Ekta Complex, Nr. Ajay Estate, Gujarat Bottling, Keval Kanta Road, Rakhial, Ahmedabad-23.</p>
    </div>

    <!--------------------------------------------------- Center View--------------------------------------------------->

    <div class="partyDetailContainer">
        <div id="partyPersonalDetailsView">
            <div>
                <div class="row">
                    <p id="partyNameKey"> M/s &nbsp; &nbsp; </p>
                    <p id="partyNameValue"> ${billDetails.partyName} </p>
                </div>
                <hr class="commonPartyUnderLine" />
            </div>
            <div>
                <div class="row">
                    <p id="partyNameKey"> Address  &nbsp; &nbsp; </p>
                    <p id="partyNameValue"> ${billDetails.partyAddress1} </p>
                </div>
                <hr class="addressFirstUnderline" />
            </div>
            <p id="partyNameValue"> ${billDetails.partyAddress2} </p> 
            <hr id="extraPatyAddress" />
            <div id="stateContainer">
                <div id="verticalContainer">
                    <div class="row">
                        <p id="partyNameKey"> State &nbsp; &nbsp; </p>
                        <p id="partyNameValue"> ${billDetails.state} </p>
                    </div>
                    <hr class="stateUnderline" />
                </div>
                <div id="verticalContainer">
                <div class="row">
                    <p id="partyNameKey"> &nbsp; State Code &nbsp; &nbsp; &nbsp; &nbsp; </p>
                    <p id="partyNameValue"> ${billDetails.stateCode} </p>
                    </div>
                    <hr class="stateCodeUnderline" />
                </div>
            </div>
            <div class="horizontalContainer">
                <p id="txtGSTNo">Party GST No </p>
                <div id="firstGSTNoBox"><p id="partyNameValue"> ${
                  billDetails.partyGstNumber[0]
                } </p></div>
                <div class="gstNoBox"><p id="partyNameValue"> ${
                  billDetails.partyGstNumber[1]
                } </p></div>
                <div class="gstNoBox"><p id="partyNameValue"> ${
                  billDetails.partyGstNumber[2]
                } </p></div>
                <div class="gstNoBox"><p id="partyNameValue"> ${
                  billDetails.partyGstNumber[3]
                } </p></div>
                <div class="gstNoBox"><p id="partyNameValue"> ${
                  billDetails.partyGstNumber[4]
                } </p></div>
                <div class="gstNoBox"><p id="partyNameValue"> ${
                  billDetails.partyGstNumber[5]
                } </p></div>
                <div class="gstNoBox"><p id="partyNameValue"> ${
                  billDetails.partyGstNumber[6]
                } </p></div>
                <div class="gstNoBox"><p id="partyNameValue"> ${
                  billDetails.partyGstNumber[7]
                } </p></div>
                <div class="gstNoBox"><p id="partyNameValue"> ${
                  billDetails.partyGstNumber[8]
                } </p></div>
                <div class="gstNoBox"><p id="partyNameValue"> ${
                  billDetails.partyGstNumber[9]
                } </p></div>
                <div class="gstNoBox"><p id="partyNameValue"> ${
                  billDetails.partyGstNumber[10]
                } </p></div>
                <div class="gstNoBox"><p id="partyNameValue"> ${
                  billDetails.partyGstNumber[11]
                } </p></div>
                <div class="gstNoBox"><p id="partyNameValue"> ${
                  billDetails.partyGstNumber[12]
                } </p></div>
                <div class="gstNoBox"><p id="partyNameValue"> ${
                  billDetails.partyGstNumber[13]
                } </p></div>
                <div class="gstNoBox"><p id="partyNameValue"> ${
                  billDetails.partyGstNumber[14]
                } </p></div>
            </div>
        </div>
        <div id="billDetailView">
            <div id="rowWithBottomBorder">
                <p style="margin-top: 1px"> Invoice No.: &nbsp; &nbsp; </p>
                <p id="partyNameValue"> ${billDetails.invoiceNumber} </p>
            </div>
            <div id="rowWithBottomBorder">
                <p style="margin-top: 1px"> Date: &nbsp; &nbsp; </p>
                <p id="partyNameValue"> ${billDetails.invoiceDate} </p>
            </div>
            <div id="rowWithBottomBorder">
                <p> REVEARSE CHARGE : YES/NO </p>
            </div>
            <p id="serviceTxt">Supply of Service Palace.:</p>
            <div id="supplyPlaceName">
                <p style="text-align: center; font-size: 15px; margin-top: 0.2%; color: black;"> ${
                  billDetails.servicePalace
                } </p>
                <hr id="serviceUnderline" />
            </div>
        </div>
    </div>

    <div class="serviceDetailContainer">
        <div class="horizontalContainer">
            <div class="serviceSubContainer_SRNO">
                <div id="srNoTxt">
                    <p  style="margin-top: 2%"> Sr </p>
                    <p> No.</p>
                </div>
                <div id="srNoView">
                    <p style="align-self: center; font-size: 15px;"> 1. </p>
                </div>
            </div>
            <div class="serviceSubContainer_DES">
                <div id="desTxt">
                    <p style="margin-top: 3%"> DESCRIPTION OF GOODS </p>
                </div>
                <div id="desView">
                    <p id="desOfGoods"> ${billDetails.desOfGoods} </p>
                </div>
            </div>
            <div class="serviceSubContainer_HSN">
                <div id="srNoTxt">
                    <p  style="margin-top: 2%"> HSN </p>
                    <p> SAC </p>
                </div>
                <div id="desView">
                    <p id="hsnCode"> ${billDetails.HSNCode} </p>
                </div>
            </div>
            <div class="serviceSubContainer_QUANTITY">
                <div id="desTxt">
                    <p  style="margin-top: 11%"> QUANTITY </p>
                </div>
                <div id="desView">
                    <p id="hsnCode"> ${billDetails.quantity} </p>
                </div>
            </div>
            <div class="serviceSubContainer_RATE">
                <div id="srNoTxt">
                        <p  style="margin-top: 3%"> RATE</p>
                        <div id="rateRsPs">
                            <p style="flex: 1; font-size: 12px;"> Rs</p>
                            <p style="flex: 0.4; font-size: 12px;"> Ps</p>
                        </div>
                </div>
                <div id="desView">
                    <div id= "verLineRate">
                        <p style="text-align: center; flex: 1; font-size: 15px; color: black; margin-top: 5px"> ${
                          billDetails.rateInRs
                        } </p>
                        <hr style="width:1px; color:red; background-color:red;border: none; ">
                        <p style="text-align: center; flex: 0.4; font-size: 15px; color: black;  margin-top: 5px"> ${
                          billDetails.rateInPs
                        } </p>
                    </div>
                </div>
            </div>
            <div class = "serviceSubContainer_PER">
                <div id="desTxt">
                    <p  style="margin-top: 28%;"> PER</p>
                </div>
                <div id="desView">
                <p id="hsnCode"> ${billDetails.per} </p>
                </div>
            </div>
            <div class = "serviceSubContainerAMOUNT">
                <div id="srNoTxt">
                    <p  style="margin-top: 3%; margin-left: 2%"> Amount</p>
                    <div id="amountRsPs">
                        <p style="flex: 1;font-size: 12px;"> Rs</p>
                        <p style="flex: 0.3; font-size: 12px;"> Ps</p>
                    </div>
                </div>
                <div id="desView">
                    <div id="verLineRate">
                        <p style="text-align: center; flex: 1; font-size: 15px; color: black; margin-top: 5px"> ${
                          billDetails.basicAmountInRs
                        } </p>
                        <hr style="width:1px; color:red; background-color:red;border: none; ">
                        <p style="text-align: center; flex: 0.3; font-size: 15px; color: black;  margin-top: 5px"> ${
                          billDetails.basicAmountInPs
                        } </p>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <!--------------------------------------------------- Footer View--------------------------------------------------->
    <div class="row">
        <div class="columnClass">
            <div id="rupees">
                <div style="flex-direction: row; display: flex;">
                    <p style="flex: 0.3"> RUPEES : &nbsp; &nbsp; </p>
                    <p style="margin-left: 5px; margin-bottom: 5px ;color:black;"> ${
                      billDetails.rupeesInWords
                    } </p>
                </div>
                <hr id="rupeesLine" />
            </div>
            <div id="bank">
                <h3> Bank Detail</h3>
            </div>
            <div id="bankDetailSubContainer">
                <div id="detailKeys">
                    <p> Name</p>
                    <p> Bank Name</p>
                    <p> Branch </p>
                    <p> Current A/c. No.</p>
                    <p> RTGS/NEFT Code</p>
                </div>
                <div>
                    <p> : &nbsp; Patilbhai Contractor</p>
                    <p> : &nbsp; The Ahmedabad Disrict Co-Op. Bank Ltd.</p>
                    <p> : &nbsp; CTM Char Rasta</p>
                    <p> : &nbsp; 607115100762</p>
                    <p> : &nbsp; GSCB0ADC001</p>
                </div>
            </div>
        </div>
        <div id="payableAmount">
            <div class="subContainerPrices">
                <p id="totalTxt"> &nbsp; TOTAL</p>
                <p id="centerView"> &nbsp; SGST ${
                  billDetails.SGSTAmount != "0"
                    ? billDetails.HSNCode == "997329"
                      ? "(2.5 %)"
                      : "(9 %)"
                    : ""
                } </p>
                <p id="centerView"> &nbsp; CGST ${
                  billDetails.CGSTAmount != "0"
                    ? billDetails.HSNCode == "997329"
                      ? "(2.5 %)"
                      : "(9 %)"
                    : ""
                } </p>
                <p id="centerView"> &nbsp; IGST ${
                  billDetails.IGSTAmount != "0"
                    ? billDetails.HSNCode == "997329"
                      ? "(5 %)"
                      : "(18 %)"
                    : ""
                } </p>
                <p id="centerViewinGrandTotal"> GRAND TOTAL</p>
            </div>
            <div class="subContainerValues">
                <p id="totalTxtValue"> &nbsp; ${billDetails.totalAmount} </p>
                <p id="centerView"> &nbsp; ${billDetails.SGSTAmount} </p>
                <p id="centerView"> &nbsp; ${billDetails.CGSTAmount} </p>
                <p id="centerView"> &nbsp; ${billDetails.IGSTAmount} </p>
                <p id="centerViewinGrandTotal"> &nbsp; ${billDetails.grandTotalAmount} </p>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="columnClass">
            <div id="horizontalView">
                <h3> TERMS & CONDITIONS :</h3>
                <h4>E.&.O.E. </h4>
            </div>
            <p class="paddingLeft"> 1. This bill should be paid within one month from the date, failing @24% </p>
            <p class="paddingLeft"> &nbsp; &nbsp; interest will be change, bill remain unpaid after 10 days, of
                after
                the date specified in our bill</p>
            <p class="paddingLeft"> 2. Goods once sold will not be taken back.</p>
            <p class="paddingLeft"> 3. Our risk and responsibility ceases after goods leave our premises.</p>
            <p class="paddingLeft"> 4. Subject to AHMEDABAD Jurisdiction.</p>
        </div>
        <div id="forPatil">
            <p style="font-family: Greyhound; font-size: 12px; letter-spacing: 0.8px; margin-top: 0px;"> FOR, Patilbhai Contractor</p>
            <p style="margin-bottom: 3%; font-size: 12px;"> Proprietor/Authorized Signature</p>
        </div>
    </div>
    </div>
</body>

</html>
    `
}
