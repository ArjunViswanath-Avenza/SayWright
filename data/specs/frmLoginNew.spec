form frmLoginNew
  flex flxMain  layout=horizontal w=100% h=100% cx=unset b3.layout=vertical b3.h=preferred
    flex flxLeftPanel  layout=vertical w=35% h=100% skin=sknflx0f2233 top=0dp left=0dp cx=unset b3.w=100% b3.h=150dp
      flex flxBrand  layout=horizontal w=preferred h=preferred top=50dp left=60dp cx=unset autogrow=1 b3.top=32dp b3.left=24dp
        label lblAvenza  w=preferred h=preferred skin=CopydefLabel0c08cfe8ca13b4b text=Avenza top=0dp left=0dp
        label lblBank  w=preferred h=preferred skin=CopydefLabel0c7937e5e36bd40 text=Bank top=0dp left=0dp
      flex flxBadges  layout=horizontal w=preferred h=preferred top=30dp left=60dp cx=unset autogrow=1 b3.visible=false
        label lblFdic  w=preferred h=preferred skin=CopydefLabel0d9c36a8cc7b24d text="FDIC insured" top=0dp left=0dp
        label lblSupport  w=preferred h=preferred left=14dp skin=CopydefLabel0d9c36a8cc7b24d text="24/7 support" cx=unset top=0dp
        label lblVersion  w=preferred h=preferred left=14dp skin=CopydefLabel0d9c36a8cc7b24d text=v2.4.0 cx=unset top=0dp
      label lblBanking  w=70% h=preferred top=90dp left=60dp skin=CopydefLabel0g3ca6c356c1746 text="Banking that stays out of your way." cx=unset b3.top=20dp b3.left=24dp b3.w=88% b3.skin=sknlblffffff30px
      label lblInfo  w=75% h=preferred top=100dp left=60dp text="Accounts, transfers and statements in one place. Secured with 256-bit encryption." cx=unset b3.visible=false
    flex flxRight  layout=free w=65% h=100% skin=sknflxE3E9EE top=0dp left=0dp cx=unset b3.w=90% b3.h=100% b3.left=5% b3.top=30dp b3.bottom=30dp
      flex flxCard  layout=vertical w=500dp h=520dp cx=50% cy=50% skin=sknflxE3E9EE b3.w=92% b3.cy=284dp
        label lblSignIn  w=preferred h=preferred top=30dp left=16dp skin=CopydefLabel0b958727ed83141 text="Sign in" cx=unset b3.left=4%
        label lblSignInInfo  w=preferred h=preferred top=8dp left=16dp text="Use the credentials issued by your branch." cx=unset b3.left=4%
        label lblUserId  w=preferred h=preferred top=16dp left=16dp skin=sknlblSubheading00000015px text="User Id" cx=unset b3.left=4%
        textbox tbxUserId  w=405dp h=50dp top=8dp left=16dp skin=skntbx5b6b7a15px placeholder="Enter user id" cx=unset b3.w=92% b3.left=4%
        flex flxPasswordRow  layout=horizontal w=405dp h=preferred top=20dp left=16dp cx=unset autogrow=1 b3.w=92% b3.left=4%
          label lblPassword  w=50% h=preferred skin=sknlblSubheading00000015px text=Password top=0dp left=0dp
          label lblForgot  w=50% h=preferred skin=CopydefLabel0ac07d4ebd8e448 align=6 text="Forget password?" top=0dp left=0dp
        textbox tbxPassword  w=405dp h=50dp top=8dp left=16dp skin=skntbx5b6b7a15px placeholder="Enter your password" secure=true cx=unset b3.w=92% b3.left=4%
        flex flxRemember  layout=horizontal w=405dp h=preferred top=16dp left=16dp cx=unset autogrow=1 b3.w=92% b3.left=4%
          flex flxCheck  layout=vertical w=22dp h=22dp skin=CopyslFbox0cf62699586c744 top=0dp left=0dp cx=unset
          label lblRemember  w=preferred h=preferred left=10dp skin=sknLblDescription text="Keep me signed in on this device" cx=unset top=0dp
        button btnSignIn  w=405dp h=50dp top=24dp left=16dp text="Sign In" cx=unset b3.w=92% b3.left=4%
        flex flxOpenAccount  layout=horizontal w=preferred h=preferred top=40dp cx=50% left=0dp autogrow=1
          label lblNewToBank  w=preferred h=preferred skin=sknLblDescription text="New to Avenza Bank?" top=0dp left=0dp
          label lblOpenAccount  w=preferred h=preferred left=6dp skin=CopydefLabel0ac07d4ebd8e448 text="Open an account" cx=unset top=0dp
