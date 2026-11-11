form frmApply
  flex flxMain  layout=vertical w=100% h=100%
    flex flxLayer  layout=vertical w=90% h=preferred top=40dp left=0dp autogrow=1
      label lblOpenAnAccount  w=preferred h=preferred skin=CopydefLabel0heac53a79ef44e text="Open an account" top=0dp left=0dp
      flex flxRow  layout=horizontal w=100% h=preferred top=10dp left=0dp autogrow=1
        textbox tbxFirstName  w=49% h=40dp placeholder="Enter first name" top=0dp left=0dp
        textbox tbxLastName  w=49% h=40dp placeholder="Enter last name" left=2% top=0dp
      textbox tbxEmail  w=100% h=40dp placeholder="Enter email" top=10dp left=0dp
      button btnContinue  w=200dp h=40dp text=Continue top=10dp left=0dp
