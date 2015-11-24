beforeEach(function () {
	browser.get("http://bnj-design.github.io/app/");
	//browser.get("http://127.0.0.1:8888/bnj-design.github.io/app/");
}, 20000);

describe("catalogue test 1 : try to add 0 article to cart", function() {
	it("should display an error popup then close it", function() {
		//get the first "add to cart" icon
		element.all(by.css(".book-add-cart")).get(0).click();
		
		//modal title
		var modalTitle = element(by.css(".modal-title"));
		
		//when popup is open : click the button to close it
		browser.isElementPresent(modalTitle).then(function(isPresent){
			if(isPresent) {
				//expect modal title to be "Information"
				expect(modalTitle.getText()).toEqual("Information");
				
				//clic the close button
				element(by.css(".btn")).click();
			}
		});
  	});
});

describe("catalogue test 2 : try to add 2 articles of book 1 to cart", function() {
	it("should display an error popup then close it", function() {
		//set 2 items into the cart by using the first select
		element(by.cssContainingText("option", "2")).click();
	
		//get the first "add to cart" icon
		element.all(by.css(".book-add-cart")).get(0).click();

		//modal info title
		var modalTitle = element(by.css(".modal-title"));

		//when pop-up is open : click the button to close it
		browser.isElementPresent(modalTitle).then(function(isPresent){
			if(isPresent) {
				//expect modal title to be "Information"
				expect(modalTitle.getText()).toEqual("Information");

				//clic the close button
				element(by.css(".btn")).click();
			}
		});
	});
});

describe("catalogue test 3 : try to open cart and validate it", function() {
	it("should clic to open the cart and validate it", function() {
		//clic on the cart view button
		element(by.css(".cart-view")).click();
		
		//cart title
		var cartTitle = element(by.css(".modal-title"));
		
		//when the cart is open : test nb items and validate cart
		browser.isElementPresent(cartTitle).then(function(isPresent){
			if(isPresent) {
				//expect modal title to be "Visualiser mon panier"
				expect(cartTitle.getText()).toEqual("Visualiser mon panier");

				//clic the close button
				element(by.css(".btn-primary")).click();
				
				//wait for "under construction" page
				browser.isElementPresent(element(by.css(".under-construction"))).then(function(isPresent){
					if(isPresent) {
						var btn = element(by.css(".btn-primary"));
						
						//button
						expect(btn.getText()).toEqual("Revenir au catalogue");
						
						//clic button to go back to catalogue
						btn.click();
					}
				});
				
			}
		});
	});
});

describe("catalogue test 4 : delete items from cart", function() {
	it("should clic to open the cart and validate it", function() {
		//clic on the cart view button
		element(by.css(".cart-view")).click();
		
		//cart title
		var cartTitle = element(by.css(".modal-title"));
		
		//when the cart is open : test nb items and validate cart
		browser.isElementPresent(cartTitle).then(function(isPresent){
			if(isPresent) {
				//expect modal title to be "Visualiser mon panier"
				expect(cartTitle.getText()).toEqual("Visualiser mon panier");
				
				element(by.name("checkBook")).click();

				element(by.css(".btn-info")).click();
				
				element(by.css(".btn-warning")).click();
			}
		});
	});
});
