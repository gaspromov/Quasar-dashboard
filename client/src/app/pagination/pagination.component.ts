import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, SimpleChanges, OnChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FilterMembersPipe } from '../shared/pipes/filterMembers/filter-members.pipe';
import { SearchPipe } from '../shared/pipes/search/search.pipe';
import { SortPipe } from '../shared/pipes/sort/sort.pipe';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnChanges, OnInit, OnDestroy {
  @Input() items: any = [{}];
  @Input() onPage: number;

  @Input() sort: string = '';
  @Input() search: string = '';
  @Input() lifetime: boolean = false;
  @Input() renewal: boolean = false;

  @Output() onOutputItems = new EventEmitter<[{}]>();

  searching = new SearchPipe();
  sorting = new SortPipe();
  filtering = new FilterMembersPipe();

  outputItems: any = [];
  countPages: number;
  arrayOfPages: any = [];
  currentPage = 1;
  subscription;
  ItemSubscription;
  pageLink;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute, 
  ){ 
      this.subscription = this.activatedRoute.queryParams.subscribe( queryParams => {
        if (queryParams['page'] != undefined){
          this.pageLink = Number(queryParams['page']);
          if (this.items.length != undefined){
            if ( this.pageLink == undefined){
              this.pageLink = 1;
            }
            this.setPage(this.pageLink);
          }
        }
      })

  }

  ngOnInit(): void {
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  ngOnChanges(){
    this.onGetItems();
  }

  onGetItems(){
    this.arrayOfPages = []
    let items;
    items = this.filtering.transform(this.items, this.lifetime, this.renewal);
    items = this.sorting.transform(items, this.sort);
    items = this.searching.transform(items, this.search);
    this.countPages = Math.ceil(items.length/this.onPage);
    for (let i=1; i <= this.countPages; i++){
      this.arrayOfPages.push(i);
    }
    if (this.countPages != 0)
     this.setOutputItems();
    this.setCurrentPage()
  }

  changePage(num){
      if ( this.currentPage == this.countPages && num == 1 || this.currentPage == 1 && num == 2)
        return;
      if (num == 2)
        this.currentPage = this.currentPage - 1;
      else 
        this.currentPage = Number(this.currentPage) + 1;
      this.setOutputItems()
      this.setLink(this.currentPage)
  }

  setPage(page){
    this.currentPage = page;
    this.setOutputItems();
    this.setLink(this.currentPage)
  }

  setOutputItems(){
    let end: number;
    let start: number;
    let items;
    items = this.filtering.transform(this.items, this.lifetime, this.renewal);
    items = this.sorting.transform(items, this.sort);
    items = this.searching.transform(items, this.search);
    start = (this.currentPage-1) * this.onPage;
      
    if (this.currentPage !== this.countPages)
      end = this.currentPage * this.onPage;
    else
      end = items.length;
    this.outputItems = items.slice(start, end)
    this.onOutputItems.emit(this.outputItems);
  }

  setLink(page){
    if (page != 'more'){
      this.router.navigate([], {
        queryParams: {
          page: page
        },
        queryParamsHandling: 'merge',
      });
    }
  }

  setCurrentPage(){
    if (this.pageLink == undefined || this.pageLink < 1 || !Number.isInteger(this.pageLink)){
      this.setLink(1)
      return;
    }
    else if (this.pageLink > this.countPages){
      this.setLink(this.countPages)
      return;
    }
    this.currentPage = this.pageLink;
  }
}
