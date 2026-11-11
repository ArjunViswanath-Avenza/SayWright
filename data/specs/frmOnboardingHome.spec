form frmOnboardingHome
  flex flxMain  layout=free w=100% h=100% cx=unset
    flex flxPage  layout=free w=100% h=906dp skin=sknObPage cx=unset
      flex flxGlowViolet  layout=vertical w=2dp h=2dp top=170dp left=300dp skin=sknObGlowViolet cx=unset
      flex flxGlowCyan  layout=vertical w=2dp h=2dp top=640dp left=1130dp skin=sknObGlowCyan cx=unset
      flex flxHeader  layout=free w=1130dp h=44dp top=20dp left=118dp cx=unset
        flex flxLogoMark  layout=free w=28dp h=28dp left=0dp cy=50% skin=sknObLogo cx=unset
          label lblLogoMark  w=preferred h=preferred cx=50% cy=50% skin=sknObStrong text=A
        label lblBrand  w=preferred h=preferred left=38dp cy=50% skin=sknObBrand text=avenza
        label lblNavPersonal  w=preferred h=preferred left=161dp cy=50% skin=sknObNav text=Personal
        label lblNavBusiness  w=preferred h=preferred left=255dp cy=50% skin=sknObNav text=Business
        label lblNavWealth  w=preferred h=preferred left=349dp cy=50% skin=sknObNav text=Wealth
        label lblNavHelp  w=preferred h=preferred left=431dp cy=50% skin=sknObNav text=Help
        flex flxLanguage  layout=free w=86dp h=30dp left=766dp cy=50% skin=sknObPill cx=unset
          label lblLanguage  w=preferred h=preferred cx=50% cy=50% skin=sknObNav text="EN / AR"
        button btnResumeHeader  w=170dp h=42dp left=865dp cy=50% skin=sknObBtnGhost text="Resume application"
        button btnSignIn  w=83dp h=40dp left=1047dp cy=50% skin=sknObBtnWhite text="Sign in"
      flex flxHero  layout=vertical w=620dp h=preferred top=192dp left=118dp cx=unset autogrow=1
        flex flxBadge  layout=free w=262dp h=30dp top=0dp left=0dp skin=sknObBadge cx=unset
          flex flxBadgeDot  layout=vertical w=10dp h=10dp left=12dp cy=50% skin=sknObDot cx=unset
          label lblBadge  w=preferred h=preferred left=30dp cy=50% skin=sknObBadgeText text="Open an account in ~6 minutes"
        label lblHeadline  w=610dp h=preferred top=14dp left=0dp skin=sknObHeadline text="Banking that moves at your speed."
        label lblSubtext  w=500dp h=preferred top=14dp left=0dp skin=sknObBody text="100% digital onboarding. All you need is your Emirates ID and a quick selfie. No branch visits, no paperwork."
        flex flxActions  layout=horizontal w=preferred h=preferred top=28dp left=0dp cx=unset autogrow=1
          button btnStart  w=243dp h=55dp skin=sknObBtnWhite text="Start new application →" top=0dp left=0dp
          button btnResume  w=208dp h=55dp left=12dp skin=sknObBtnGhost text="Resume application" top=0dp
        flex flxFeatures  layout=horizontal w=preferred h=preferred top=28dp left=0dp cx=unset autogrow=1
          flex flxDotInstant  layout=vertical w=10dp h=10dp cy=50% skin=sknObDot top=0dp left=0dp cx=unset
          label lblInstant  w=preferred h=preferred left=8dp skin=sknObNav text="Instant account" top=0dp
          flex flxDotPaper  layout=vertical w=10dp h=10dp left=26dp cy=50% skin=sknObDot top=0dp cx=unset
          label lblPaper  w=preferred h=preferred left=8dp skin=sknObNav text="Zero paperwork" top=0dp
          flex flxDotSecure  layout=vertical w=10dp h=10dp left=26dp cy=50% skin=sknObDot top=0dp cx=unset
          label lblSecure  w=preferred h=preferred left=8dp skin=sknObNav text="Bank-grade security" top=0dp
      flex flxVisual  layout=free w=509dp h=454dp top=163dp left=741dp cx=unset
        flex flxCardBack  layout=vertical w=200dp h=90dp top=19dp left=86dp skin=sknObCardBack cx=unset
        flex flxCard  layout=free w=435dp h=272dp top=66dp left=37dp skin=sknObCard cx=unset
          label lblCardBrand  w=preferred h=preferred top=20dp left=21dp skin=sknObCardBrand text=avenza
          flex flxCardChip  layout=vertical w=39dp h=29dp top=102dp left=21dp skin=sknObCardChip cx=unset
          label lblCardHolder  w=preferred h=preferred top=208dp left=21dp skin=sknObCardText text="SARA AL MANSOORI"
          label lblCardNumber  w=preferred h=preferred top=230dp left=21dp skin=sknObCardNumber text="•••• 2048"
          label lblCardType  w=preferred h=preferred top=230dp left=368dp skin=sknObCardText text=DEBIT
        flex flxChipRate  layout=free w=215dp h=60dp top=0dp left=294dp skin=sknObGhost cx=unset
          flex flxRateIcon  layout=vertical w=32dp h=32dp left=14dp cy=50% skin=sknObIcon cx=unset
          label lblRate  w=preferred h=preferred top=9dp left=58dp skin=sknObStrong text="3.50% p.a."
          label lblRateNote  w=preferred h=preferred top=30dp left=58dp skin=sknObMuted text="on Standard Savings"
        flex flxChipOpened  layout=free w=215dp h=60dp top=379dp left=0dp skin=sknObGhost cx=unset
          flex flxOpenedIcon  layout=vertical w=32dp h=32dp left=14dp cy=50% skin=sknObIconCyan cx=unset
          label lblOpened  w=preferred h=preferred top=9dp left=58dp skin=sknObStrong text="Account opened"
          label lblOpenedNote  w=preferred h=preferred top=30dp left=58dp skin=sknObMuted text="in 5 min 42 sec"
        flex flxChipFace  layout=free w=215dp h=60dp top=394dp left=294dp skin=sknObGhost cx=unset
          flex flxFaceIcon  layout=vertical w=32dp h=32dp left=14dp cy=50% skin=sknObIconCyan cx=unset
          label lblFace  w=preferred h=preferred top=9dp left=58dp skin=sknObStrong text="Face match 99.2%"
          label lblFaceNote  w=preferred h=preferred top=30dp left=58dp skin=sknObMuted text="Verified in seconds"
      flex flxSteps  layout=horizontal w=1130dp h=84dp top=770dp left=118dp cx=unset
        flex flxStepOne  layout=free w=270dp h=84dp skin=sknObGhost top=0dp left=0dp cx=unset
          flex flxStepOneNo  layout=free w=36dp h=36dp left=20dp cy=50% skin=sknObStepNo cx=unset
            label lblStepOneNo  w=preferred h=preferred cx=50% cy=50% skin=sknObStepNumber text="1"
          label lblStepOne  w=preferred h=preferred top=18dp left=72dp skin=sknObStrong text="Choose a product"
          label lblStepOneNote  w=preferred h=preferred top=42dp left=72dp skin=sknObMuted text="Savings, current, deposits"
        flex flxStepTwo  layout=free w=270dp h=84dp left=17dp skin=sknObGhost top=0dp cx=unset
          flex flxStepTwoNo  layout=free w=36dp h=36dp left=20dp cy=50% skin=sknObStepNo cx=unset
            label lblStepTwoNo  w=preferred h=preferred cx=50% cy=50% skin=sknObStepNumber text="2"
          label lblStepTwo  w=preferred h=preferred top=18dp left=72dp skin=sknObStrong text="Verify contact"
          label lblStepTwoNote  w=preferred h=preferred top=42dp left=72dp skin=sknObMuted text="Mobile and email OTP"
        flex flxStepThree  layout=free w=270dp h=84dp left=17dp skin=sknObGhost top=0dp cx=unset
          flex flxStepThreeNo  layout=free w=36dp h=36dp left=20dp cy=50% skin=sknObStepNo cx=unset
            label lblStepThreeNo  w=preferred h=preferred cx=50% cy=50% skin=sknObStepNumber text="3"
          label lblStepThree  w=preferred h=preferred top=18dp left=72dp skin=sknObStrong text="Scan ID & selfie"
          label lblStepThreeNote  w=preferred h=preferred top=42dp left=72dp skin=sknObMuted text="Auto-filled in seconds"
        flex flxStepFour  layout=free w=270dp h=84dp left=17dp skin=sknObGhost top=0dp cx=unset
          flex flxStepFourNo  layout=free w=36dp h=36dp left=20dp cy=50% skin=sknObStepNo cx=unset
            label lblStepFourNo  w=preferred h=preferred cx=50% cy=50% skin=sknObStepNumber text="4"
          label lblStepFour  w=preferred h=preferred top=18dp left=72dp skin=sknObStrong text="Start banking"
          label lblStepFourNote  w=preferred h=preferred top=42dp left=72dp skin=sknObMuted text="Card ready instantly"
