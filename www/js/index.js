
function nav(x)
{
	//screen navigation controls.
	switch(x)
	{
		case "buy":
            document.getElementById("buy_nav").style.borderBottom ="solid 1vh #73d14b";
            document.getElementById("sell_nav").style.borderBottom ="solid 0vh #73d14b";
            document.getElementById("Mystore_nav").style.borderBottom ="solid 0vh #73d14b";
            document.getElementById("more_nav").style.borderBottom ="solid 0vh #73d14b";
            //change screen
            document.getElementById("product_selection").style.display="flex";
            document.getElementById("sell_section").style.display="none";
            document.getElementById("my_store").style.display="none";
            document.getElementById("more_selection").style.display="none";
            break;
        case "sell":

            document.getElementById("buy_nav").style.borderBottom ="solid 0vh #73d14b";
            document.getElementById("sell_nav").style.borderBottom ="solid 1vh #73d14b";
            document.getElementById("Mystore_nav").style.borderBottom= "solid 0vh #73d14b";
            document.getElementById("more_nav").style.borderBottom ="solid 0vh #73d14b";
            //change screen
            document.getElementById("product_selection").style.display="none";
            document.getElementById("sell_section").style.display="flex";
            document.getElementById("my_store").style.display="none";
            document.getElementById("more_selection").style.display="none";
            break;
        case "Mystore":

            document.getElementById("buy_nav").style.borderBottom = "solid 0vh #73d14b";
            document.getElementById("sell_nav").style.borderBottom = "solid 0vh #73d14b";
            document.getElementById("Mystore_nav").style.borderBottom = "solid 1vh #73d14b";
            document.getElementById("more_nav").style.borderBottom = "solid 0vh #73d14b";
            //change screen
            document.getElementById("product_selection").style.display="none";
            document.getElementById("sell_section").style.display="none";
            document.getElementById("my_store").style.display="flex";
            document.getElementById("more_selection").style.display="none";
            break;
        case "more":

            document.getElementById("buy_nav").style.borderBottom = "solid 0vh #73d14b";
            document.getElementById("sell_nav").style.borderBottom = "solid 0vh #73d14b";
            document.getElementById("Mystore_nav").style.borderBottom = "solid 0vh #73d14b";
            document.getElementById("more_nav").style.borderBottom = "solid 1vh #73d14b";
            //change screen
            document.getElementById("product_selection").style.display="none";
            document.getElementById("sell_section").style.display="none";
            document.getElementById("my_store").style.display="none";
            document.getElementById("more_selection").style.display="flex";
            break;
	}
}

function closeInxdex()
{
	//closes index screen
	document.getElementById("index_page").style.marginLeft="-100vw";
}

function openInxdex()
{
	//index screen, to select opition to buy or sell prodect.
	document.getElementById("index_page").style.marginLeft="0vw";
	nav("buy");
}

function closeSignin()
{
	//close login screen 
	document.getElementById("sign_page").style.marginLeft="100vw";
}

function openSignin()
{
	//open login screen
	document.getElementById("sign_page").style.marginLeft="0vw";
}

function closeRegister()
{
	//closes signup screen
	document.getElementById("register_page").style.marginLeft="100vw";
}

function openRegister()
{
	//open signup screen
	document.getElementById("register_page").style.marginLeft="0vw";
}

function closeTraders()
{
	//closes list of traders
	document.getElementById("select_trader").style.marginLeft="100vw";
}

function openTraders()
{
	//opens list of traders for selected item 
	document.getElementById("select_trader").style.marginLeft="0vw";
}

function closeBooking()
{
	//closes booking screen
	document.getElementById("place_order").style.marginLeft="100vw";
}

function openBooking()
{
	//open booking screen
	document.getElementById("place_order").style.marginLeft="0vw";
}

function loader(x)
{
	//used to prevent clicks when loading data from server / api.
	//x = 0 (show).
	//x = 100 (hide).
	//call the fucntion loader(x) when needed.
	document.getElementById("loading_page").style.marginLeft=x+"vw";
}

function increment(x)
{
	//increase price
	var a=document.getElementById(x).value;
	//convert to integar
	a=parseInt(a,10);
	//return increment
	document.getElementById(x).value=a+5;
}

function decrement(x)
{
	//increase price
	var a=document.getElementById(x).value;
	//convert to integar
	a=parseInt(a,10);
	//return decrement
	if(a===0)
	{
		return 0;
	}
	else
	{
		document.getElementById(x).value=a-5;
	}
	
}

//add new fuctions / features.