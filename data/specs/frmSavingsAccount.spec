form frmSavingsAccount  skin=sknSwFrmf6f6fax168f
  flex flxMain  layout=free w=100% h=100% cx=unset
    flex flxPage  layout=vertical w=100% h=preferred top=0dp left=0dp cx=unset autogrow=1
      flex flxAvenza  layout=free w=83.5% h=42dp top=22dp left=8.5% b3.left=4% b3.w=92% cx=unset
        flex flxAvenza2  layout=horizontal w=preferred h=preferred top=6dp left=0dp cx=unset autogrow=1
          image imgIcon  w=30dp h=30dp src=aivf68c6b3182.png top=0dp left=0dp cx=unset cy=unset
          label lblAvenza  w=preferred h=preferred top=7dp left=9dp skin=sknSectionHeaderLabelSkin text=avenza b2.left=14dp
          label lblPersonal  w=preferred h=preferred top=6dp left=54dp skin=sknSwLbl0b0c2415x14b5 text=Personal b2.left=14dp b3.visible=false
          label lblBusiness  w=preferred h=preferred top=5dp left=36dp skin=sknSwLbl3b3e6015x36e0 text=Business b2.left=14dp b3.visible=false
          label lblWealth  w=preferred h=preferred top=6dp left=35dp skin=sknSwLbl3b3e6015x36e0 text=Wealth b2.left=14dp b3.visible=false
          label lblHelp  w=preferred h=preferred top=6dp left=36dp skin=sknSwLbl3b3e6015x36e0 text=Help b2.left=14dp b3.visible=false
        flex flxGroup  layout=horizontal w=371dp h=preferred top=0dp right=0dp cx=unset autogrow=1
          button btnEnAr  w=88dp h=31dp top=5dp left=0dp skin=sknSwBtnfcfcfc19R10x78ab text="EN / AR"
          button btnResumeApplication  w=171dp h=39dp top=2dp left=13dp skin=sknSwBtnfcfcfc16R7x550c text="Resume application" b2.left=14dp
          button btnSignIn  w=85dp h=42dp top=0dp left=12dp skin=sknSwBtn060c2415R9x8752 text="Sign in" b2.left=14dp
      flex flxAllProducts  layout=horizontal w=83% h=preferred top=58dp left=8.5% b3.left=4% b3.w=92% b3.top=35dp cx=unset autogrow=1
        image imgIcon2  w=18dp h=16dp src=aiv79c7ee5f53.png top=2dp left=0dp cx=unset cy=unset
        label lblAllProducts  w=preferred h=preferred top=0dp left=4dp skin=sknSwLbl8f92af14x1286 text="All products"
      flex flxSavingsAccounts  layout=free w=83.4% h=80dp top=16dp left=8.5% b3.left=4% b3.w=92% b3.layout=vertical b3.h=preferred cx=unset
        flex flxSavingsAccounts2  layout=vertical w=65.1% h=preferred top=0dp left=0dp b2.w=52.4% b3.left=0dp b3.top=0dp b3.w=100% cx=unset autogrow=1
          label lblSavingsAccounts  w=preferred h=preferred top=0dp left=0dp skin=sknSwLbl00001240Bx0189 text="Savings accounts" b2.skin=sknSwLbl00001233Bx6be1 b3.skin=sknSwLbl00001223Bx3be0
          label lblGrowMoneyWith  w=preferred h=preferred top=6dp left=0dp skin=sknSwLbl72769317xc3b4 text="Grow your money with competitive rates and no hidden fees."
        flex flxCompare  layout=horizontal w=393dp h=preferred top=46dp right=0dp b3.left=0dp b3.top=14dp b3.w=100% cx=unset autogrow=1
          button btnAll  w=42dp h=34dp top=0dp left=0dp skin=sknSwBtn060c2415R9x8752 text=All
          button btnStandard  w=83dp h=32dp top=1dp left=2.1% skin=sknSwBtnfcfcfc16R7x550c text=Standard
          button btnPrime  w=63dp h=32dp top=1dp left=2.1% skin=sknSwBtnfcfcfc16R7x550c text=Prime
          button btnJunior  w=64dp h=32dp top=1dp left=1.8% skin=sknSwBtnfcfcfc16R7x550c text=Junior
          flex flxCompare2  layout=horizontal w=26.4% h=32dp top=1dp left=2.6% skin=CopyslFbox0f6c9a001956743 cx=unset
            image imgIcon3  w=14dp h=21dp src=aivcabaae1e4e.png top=8dp left=11dp cx=unset cy=unset
            label lblCompare  w=preferred h=preferred top=5dp left=6dp skin=sknSwLbl0b0c2415x14b5 text=Compare
      flex flxMostPopular  layout=horizontal w=83.4% h=preferred top=34dp left=8.5% b3.left=4% b3.w=92% b3.top=20dp b3.layout=vertical b3.h=preferred cx=unset autogrow=1
        flex flxMostPopular2  layout=vertical w=31.9% h=570dp top=0dp left=0dp skin=sknSwFlx060c24R20xc2f4 b2.h=890dp b3.left=0dp b3.top=0dp b3.w=100% b3.h=preferred cx=unset
          flex flxMostPopular3  layout=free w=85.7% h=23dp top=27dp left=26dp skin=sknSwFlx0c2a42R7xef04 b2.w=80.9% b3.left=16dp b3.w=94.6% cx=unset
            label lblMostPopular  w=preferred h=preferred top=2dp left=11dp skin=sknSwLbl7ce6ff14Bxd908 text="Most popular"
          label lblStandardSavingsAccount  w=preferred h=preferred top=15dp left=26dp skin=sknObBrand text="Standard Savings Account" b2.w=80.9% b3.left=16dp b3.w=94.6%
          flex flx350  layout=horizontal w=72.7% h=preferred top=0dp left=28dp b2.layout=vertical b2.h=preferred b3.left=16dp b3.w=94.6% cx=unset autogrow=1
            label lbl350  w=preferred h=preferred top=0dp left=0dp skin=sknSwLblffffff57Bx3897 text=3.50% b2.left=0dp b2.top=0dp b2.w=100% b2.skin=sknSwLblffffff47Bxb97f b3.skin=sknSwLblffffff33Bxda3f
            label lblPInterestPaid  w=36.9% h=preferred top=23dp left=5.7% skin=sknSwLbl8f92af14x1286 text="p.a. interest paid quarterly" b2.left=0dp b2.top=14dp b2.w=100%
          flex flxMinBalance  layout=horizontal w=85.7% h=preferred top=12dp left=26dp b2.w=80.9% b2.layout=vertical b2.h=preferred b3.left=16dp b3.w=94.6% cx=unset autogrow=1
            flex flxMinBalance2  layout=vertical w=31.8% h=58dp top=0dp left=0dp skin=sknSwFlx1e1e30R7xb886 b2.left=0dp b2.top=0dp b2.w=100% b2.h=preferred cx=unset
              label lblMinBalance  w=preferred h=preferred top=11dp left=14dp skin=sknSwLbl9193b012xf489 text="Min. balance"
              label lblAed1000  w=preferred h=preferred top=2dp left=13dp skin=sknSwLblf8f8f915x8aa3 text="AED 1,000"
              flex flxEnd  layout=vertical w=100% h=9dp top=0dp left=0dp visible=false b2.visible=true cx=unset
            flex flxAtmFees  layout=vertical w=31.8% h=58dp top=0dp left=2.3% skin=sknSwFlx1e1e30R7xb886 b2.left=0dp b2.top=14dp b2.w=100% b2.h=preferred cx=unset
              label lblAtmFees  w=preferred h=preferred top=11dp left=13dp skin=sknSwLbl9193b012xf489 text="ATM fees"
              label lblAed0  w=preferred h=preferred top=3dp left=13dp skin=sknSwLblf8f8f915x8aa3 text="AED 0"
              flex flxEnd2  layout=vertical w=100% h=11dp top=0dp left=0dp visible=false b2.visible=true cx=unset
            flex flxOpensIn  layout=vertical w=31.8% h=58dp top=0dp left=2.3% skin=sknSwFlx1e1e30R7xb886 b2.left=0dp b2.top=14dp b2.w=100% b2.h=preferred cx=unset
              label lblOpensIn  w=preferred h=preferred top=12dp left=13dp skin=sknSwLbl9193b012xf489 text="Opens in"
              label lbl6Min  w=preferred h=preferred top=2dp left=14dp skin=sknSwLblf8f8f915x8aa3 text="~6 min"
              flex flxEnd3  layout=vertical w=100% h=11dp top=0dp left=0dp visible=false b2.visible=true cx=unset
          flex flxNoAtmWithdrawal  layout=horizontal w=85.7% h=preferred top=25dp left=26dp b3.left=16dp b3.w=94.6% b3.top=16dp cx=unset autogrow=1
            image imgIcon4  w=23dp h=23dp src=aiv7d2ee5a614.png top=0dp left=0dp cx=unset cy=unset
            label lblNoAtmWithdrawal  w=preferred h=preferred top=2dp left=12dp skin=sknSwLblf8f8f915x8aa3 text="No ATM withdrawal fees"
          flex flxLowAed1  layout=horizontal w=85.7% h=preferred top=6dp left=26dp b3.left=16dp b3.w=94.6% cx=unset autogrow=1
            image imgIcon5  w=23dp h=23dp src=aiv55e4b4ff71.png top=7dp left=0dp cx=unset cy=unset
            label lblLowAed1  w=97% h=preferred top=0dp left=12dp skin=sknSwLblf8f8f915x8aa3 text="Low AED 1,000 minimum monthly balance" b2.w=183dp
          flex flxOnlineMobileBanking  layout=horizontal w=85.7% h=preferred top=7dp left=26dp b3.left=16dp b3.w=94.6% cx=unset autogrow=1
            image imgIcon6  w=23dp h=23dp src=aiva7f765b300.png top=0dp left=0dp cx=unset cy=unset
            label lblOnlineMobileBanking  w=preferred h=preferred top=2dp left=11dp skin=sknSwLblf8f8f915x8aa3 text="Online & mobile banking included" b2.w=183dp
          flex flxMonthlyEStatements  layout=horizontal w=85.7% h=preferred top=14dp left=26dp b3.left=16dp b3.w=94.6% cx=unset autogrow=1
            image imgIcon7  w=23dp h=22dp src=aive30afbcb80.png top=0dp left=0dp cx=unset cy=unset
            label lblMonthlyEStatements  w=preferred h=preferred top=1dp left=12dp skin=sknSwLblf8f8f915x8aa3 text="Monthly e-statements"
          flex flxFreeChequeBook  layout=horizontal w=85.7% h=preferred top=14dp left=26dp b3.left=16dp b3.w=94.6% cx=unset autogrow=1
            image imgIcon8  w=23dp h=23dp src=aivd801024f52.png top=0dp left=0dp cx=unset cy=unset
            label lblFreeChequeBook  w=preferred h=preferred top=2dp left=12dp skin=sknSwLblf8f8f915x8aa3 text="Free cheque book"
          flex flxGroup2  layout=horizontal w=preferred h=preferred top=58dp left=26dp b2.w=80.9% b2.layout=vertical b2.h=preferred b3.left=16dp b3.w=94.6% b3.top=35dp cx=unset autogrow=1
            button btnLearnMore  w=151dp h=54dp top=0dp left=0dp skin=sknSwBtn1e1e3018R11xd540 text="Learn more" b2.left=0dp b2.top=0dp
            button btnOpenAccount  w=149dp h=54dp top=0dp left=11dp skin=sknObBtnWhite text="Open account" b2.left=0dp b2.top=14dp
          flex flxEnd10  layout=vertical w=100% h=26dp top=0dp left=0dp visible=false b3.visible=true cx=unset
        flex flxOpensIn2  layout=vertical w=31.9% h=569dp top=1dp left=2.1% skin=sknSwFlxfcfcfcR18x3b84 b2.h=890dp b3.left=0dp b3.top=14dp b3.w=100% b3.h=preferred cx=unset
          flex flxBestRate  layout=free w=85.4% h=23dp top=27dp left=27dp skin=sknSwFlxeaeafcR4x7525 b2.w=80.2% b3.left=16dp b3.w=94.6% cx=unset
            label lblBestRate  w=preferred h=preferred top=2dp left=10dp skin=sknSwLbl5e4fff15Bx5330 text="Best rate"
          label lblPrimeSavingsAccount  w=preferred h=preferred top=15dp left=27dp skin=sknSectionHeaderLabelSkin text="Prime Savings Account" b2.w=80.2% b3.left=16dp b3.w=94.6%
          flex flx420  layout=horizontal w=73% h=preferred top=5dp left=28dp b2.layout=vertical b2.h=preferred b3.left=16dp b3.w=94.6% cx=unset autogrow=1
            label lbl420  w=preferred h=preferred top=0dp left=0dp skin=sknSwLbl00001558Bx4c31 text=4.20% b2.left=0dp b2.top=0dp b2.w=100% b2.skin=sknSwLbl00001547Bx636e b3.skin=sknSwLbl00001533Bxd7b0
            label lblPInterestPaid2  w=36.8% h=preferred top=22dp left=5.3% skin=sknSwLbl8f92af14x1286 text="p.a. interest paid quarterly" b2.left=0dp b2.top=14dp b2.w=100%
          flex flxMinBalance3  layout=horizontal w=85.1% h=preferred top=13dp left=27dp b2.w=80.2% b2.layout=vertical b2.h=preferred b3.left=16dp b3.w=94.6% cx=unset autogrow=1
            flex flxMinBalance4  layout=vertical w=31.4% h=73dp top=0dp left=0dp skin=sknSwFlxf0f6f6R10x2a5b b2.left=0dp b2.top=0dp b2.w=100% b2.h=preferred cx=unset
              label lblMinBalance2  w=preferred h=preferred top=10dp left=13dp skin=sknSwLbl9193b012xf489 text="Min. balance"
              label lblAed25000  w=56.6% h=preferred top=1dp left=13dp skin=sknSwLbl0b0c2415x14b5 text="AED 25,000"
              flex flxEnd4  layout=vertical w=100% h=8dp top=0dp left=0dp visible=false b2.visible=true cx=unset
            flex flxFees  layout=vertical w=31.7% h=73dp top=0dp left=2.6% skin=sknSwFlxf0f6f6R10x2a5b b2.left=0dp b2.top=14dp b2.w=100% b2.h=preferred cx=unset
              label lblFees  w=preferred h=preferred top=10dp left=14dp skin=sknSwLbl9193b012xf489 text=Fees
              label lblAed012  w=81.1% h=preferred top=0dp left=13dp skin=sknSwLbl0b0c2415x14b5 text="AED 0/12 mo"
              flex flxEnd5  layout=vertical w=100% h=11dp top=0dp left=0dp visible=false b2.visible=true cx=unset
            flex flxOpensIn3  layout=vertical w=31.7% h=75dp top=0dp left=2.6% skin=sknSwFlxf0f6f6R10x2a5b b2.left=0dp b2.top=14dp b2.w=100% b2.h=preferred cx=unset
              label lblOpensIn2  w=preferred h=preferred top=11dp left=13dp skin=sknSwLbl9193b012xf489 text="Opens in"
              label lbl6Min2  w=preferred h=preferred top=2dp left=14dp skin=sknSwLbl0b0c2415x14b5 text="~6 min"
              flex flxEnd6  layout=vertical w=100% h=29dp top=0dp left=0dp visible=false b2.visible=true cx=unset
          flex flxHigherRateOn  layout=horizontal w=85.7% h=preferred top=19dp left=26dp b3.left=16dp b3.w=94.6% cx=unset autogrow=1
            image imgIcon9  w=23dp h=23dp src=aiv41384a45ee.png top=7dp left=0dp cx=unset cy=unset
            label lblHigherRateOn  w=97.7% h=preferred top=0dp left=12dp skin=sknSwLbl0b0c2415x14b5 text="Higher rate on balances above AED 25,000" b2.w=183dp
          flex flxNoFeesFor  layout=horizontal w=85.7% h=preferred top=5dp left=26dp b3.left=16dp b3.w=94.6% cx=unset autogrow=1
            image imgIcon10  w=23dp h=23dp src=aiv5c99affd23.png top=0dp left=0dp cx=unset cy=unset
            label lblNoFeesFor  w=preferred h=preferred top=0dp left=12dp skin=sknSwLbl0b0c2415x14b5 text="No fees for the first 12 months" b2.w=183dp
          flex flxPriorityRelationshipManager  layout=horizontal w=85.7% h=preferred top=14dp left=26dp b3.left=16dp b3.w=94.6% cx=unset autogrow=1
            image imgIcon11  w=23dp h=22dp src=aiv5d959f2edd.png top=0dp left=0dp cx=unset cy=unset
            label lblPriorityRelationshipManager  w=preferred h=preferred top=1dp left=12dp skin=sknSwLbl0b0c2415x14b5 text="Priority relationship manager" b2.w=183dp
          flex flxFreeInternationalTransfers  layout=horizontal w=85.7% h=preferred top=14dp left=26dp b3.left=16dp b3.w=94.6% cx=unset autogrow=1
            image imgIcon12  w=23dp h=22dp src=aiv608911388f.png top=0dp left=0dp cx=unset cy=unset
            label lblFreeInternationalTransfers  w=preferred h=preferred top=1dp left=12dp skin=sknSwLbl0b0c2415x14b5 text="Free international transfers" b2.w=183dp
          flex flxAirportLoungeAccess  layout=horizontal w=85.7% h=preferred top=14dp left=26dp b3.left=16dp b3.w=94.6% cx=unset autogrow=1
            image imgIcon13  w=23dp h=22dp src=aiv204e9c788c.png top=0dp left=0dp cx=unset cy=unset
            label lblAirportLoungeAccess  w=preferred h=preferred top=1dp left=11dp skin=sknSwLbl0b0c2415x14b5 text="Airport lounge access"
          flex flxGroup3  layout=horizontal w=preferred h=preferred top=38dp left=26dp b2.w=80.9% b2.layout=vertical b2.h=preferred b3.left=16dp b3.w=94.6% b3.top=23dp cx=unset autogrow=1
            button btnLearnMore2  w=151dp h=54dp top=0dp left=0dp skin=sknSwBtnfcfcfc16R7x550c text="Learn more" b2.left=0dp b2.top=0dp
            button btnOpenAccount2  w=149dp h=53dp top=1dp left=11dp skin=sknSwBtn060c2415R9x8752 text="Open account" b2.left=0dp b2.top=14dp
          flex flxEnd11  layout=vertical w=100% h=27dp top=0dp left=0dp visible=false b3.visible=true cx=unset
        flex flxMinBalance5  layout=vertical w=32% h=567dp top=2dp left=2.2% skin=sknSwFlxfcfcfcR18x3b84 b2.h=890dp b3.left=0dp b3.top=14dp b3.w=100% b3.h=preferred cx=unset
          label lblJuniorSavingsAccount  w=preferred h=preferred top=64dp left=26dp skin=sknSectionHeaderLabelSkin text="Junior Savings Account" b2.w=80.9% b3.left=16dp b3.w=94.6%
          flex flx300  layout=horizontal w=72.8% h=preferred top=5dp left=29dp b2.layout=vertical b2.h=preferred b3.left=16dp b3.w=94.6% cx=unset autogrow=1
            label lbl300  w=preferred h=preferred top=0dp left=0dp skin=sknSwLbl00001558Bx4c31 text=3.00% b2.left=0dp b2.top=0dp b2.w=100% b2.skin=sknSwLbl00001547Bx636e b3.skin=sknSwLbl00001533Bxd7b0
            label lblPInterestPaid3  w=36.8% h=preferred top=22dp left=5.7% skin=sknSwLbl8f92af14x1286 text="p.a. interest paid quarterly" b2.left=0dp b2.top=14dp b2.w=100%
          flex flxMinBalance6  layout=horizontal w=84.9% h=preferred top=13dp left=27dp b2.w=80.2% b2.layout=vertical b2.h=preferred b3.left=16dp b3.w=94.6% cx=unset autogrow=1
            flex flxMinBalance7  layout=vertical w=31.4% h=56dp top=0dp left=0dp skin=sknSwFlxf0f6f6R10x2a5b b2.left=0dp b2.top=0dp b2.w=100% b2.h=preferred cx=unset
              label lblMinBalance3  w=preferred h=preferred top=11dp left=13dp skin=sknSwLbl9193b012xf489 text="Min. balance"
              label lblAed100  w=preferred h=preferred top=2dp left=13dp skin=sknSwLbl0b0c2415x14b5 text="AED 100"
              flex flxEnd7  layout=vertical w=100% h=10dp top=0dp left=0dp visible=false b2.visible=true cx=unset
            flex flxAge  layout=vertical w=31.4% h=56dp top=0dp left=2.9% skin=sknSwFlxf0f6f6R10x2a5b b2.left=0dp b2.top=14dp b2.w=100% b2.h=preferred cx=unset
              label lblAge  w=preferred h=preferred top=12dp left=13dp skin=sknSwLbl9193b012xf489 text=Age
              label lblUnder18  w=preferred h=preferred top=1dp left=13dp skin=sknSwLbl0b0c2415x14b5 text="Under 18"
              flex flxEnd8  layout=vertical w=100% h=10dp top=0dp left=0dp visible=false b2.visible=true cx=unset
            flex flxOpensIn4  layout=vertical w=31.4% h=56dp top=0dp left=2.9% skin=sknSwFlxf0f6f6R10x2a5b b2.left=0dp b2.top=14dp b2.w=100% b2.h=preferred cx=unset
              label lblOpensIn3  w=preferred h=preferred top=11dp left=13dp skin=sknSwLbl9193b012xf489 text="Opens in"
              label lbl8Min  w=preferred h=preferred top=2dp left=13dp skin=sknSwLbl0b0c2415x14b5 text="~8 min"
              flex flxEnd9  layout=vertical w=100% h=10dp top=0dp left=0dp visible=false b2.visible=true cx=unset
          flex flxOpenedByParent  layout=horizontal w=85.2% h=preferred top=26dp left=27dp b3.left=16dp b3.w=94.6% b3.top=16dp cx=unset autogrow=1
            image imgIcon14  w=22dp h=23dp src=aiv77151aaced.png top=0dp left=0dp cx=unset cy=unset
            label lblOpenedByParent  w=preferred h=preferred top=2dp left=12dp skin=sknSwLbl0b0c2415x14b5 text="Opened by a parent or guardian" b2.w=183dp
          flex flxSavingsGoalsWith  layout=horizontal w=85.2% h=preferred top=13dp left=27dp b3.left=16dp b3.w=94.6% cx=unset autogrow=1
            image imgIcon15  w=22dp h=23dp src=aiv77fd18022d.png top=0dp left=0dp cx=unset cy=unset
            label lblSavingsGoalsWith  w=preferred h=preferred top=2dp left=12dp skin=sknSwLbl0b0c2415x14b5 text="Savings goals with progress tracking" b2.w=183dp
          flex flxBirthdayBonusInterest  layout=horizontal w=85.2% h=preferred top=13dp left=27dp b3.left=16dp b3.w=94.6% cx=unset autogrow=1
            image imgIcon16  w=22dp h=23dp src=aiv9a3b92571e.png top=0dp left=0dp cx=unset cy=unset
            label lblBirthdayBonusInterest  w=preferred h=preferred top=2dp left=12dp skin=sknSwLbl0b0c2415x14b5 text="Birthday bonus interest"
          flex flxFreeKidsDebit  layout=horizontal w=85.2% h=preferred top=13dp left=27dp b3.left=16dp b3.w=94.6% cx=unset autogrow=1
            image imgIcon17  w=22dp h=23dp src=aivf090f06513.png top=0dp left=0dp cx=unset cy=unset
            label lblFreeKidsDebit  w=preferred h=preferred top=2dp left=12dp skin=sknSwLbl0b0c2415x14b5 text="Free kids'debit card from age 8" b2.w=183dp
          flex flxParentalSpendingControls  layout=horizontal w=85.2% h=preferred top=14dp left=27dp b3.left=16dp b3.w=94.6% cx=unset autogrow=1
            image imgIcon18  w=22dp h=23dp src=aivfa6c1ada09.png top=0dp left=0dp cx=unset cy=unset
            label lblParentalSpendingControls  w=preferred h=preferred top=1dp left=12dp skin=sknSwLbl0b0c2415x14b5 text="Parental spending controls" b2.w=183dp
          flex flxGroup4  layout=horizontal w=preferred h=preferred top=56dp left=26dp b2.w=80.9% b2.layout=vertical b2.h=preferred b3.left=16dp b3.w=94.6% b3.top=34dp cx=unset autogrow=1
            button btnLearnMore3  w=151dp h=54dp top=0dp left=0dp skin=sknSwBtnfcfcfc16R7x550c text="Learn more" b2.left=0dp b2.top=0dp
            button btnOpenAccount3  w=149dp h=53dp top=1dp left=11dp skin=sknSwBtn060c2415R9x8752 text="Open account" b2.left=0dp b2.top=14dp
          flex flxEnd12  layout=vertical w=100% h=26dp top=0dp left=0dp visible=false b3.visible=true cx=unset
