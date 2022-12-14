import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products:Product[] = [];

  dataLoaded = false;

  filterText = "";





  constructor(private productService: ProductService, 
    private activatedRoute:ActivatedRoute,
    private cartService: CartService,
    private toastrService: ToastrService) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params=>{
      if(params["categoryId"]){
        this.getProductsByCategory(params["categoryId"])
      }else{
        this.getProducts();
      }
    })

  }

  getProducts(){
    this.productService.getProducts().subscribe(response=>{
      this.products = response.data
      this.dataLoaded = true;
    })
  }

  getProductsByCategory(categoryId:number){
    this.productService.getProductsByCategory(categoryId).subscribe(response=>{
      this.products = response.data
      this.dataLoaded = true;
    })
  }

  addToCart(product:Product){
    if(product.productId === 1){
      //alert("Bu ürün eklenemez");
      this.toastrService.info("eklenemez", product.productName)

      
    }
    else{
      //alert(product.productName + " sepete eklendi")
      this.cartService.addToCart(product);
      this.toastrService.info("eklendi", product.productName)

    }
    console.log(product)
  }



}
