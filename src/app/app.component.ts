import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'material-table-management';
  displayedColumns = ["name", "class", "cir", "cbs", "queue", "actions"];
  filterValue = '';
  users: UserData[] = [];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() {
    for (let i = 1; i <= 100; i++) {
      this.users.push(createNewUser(i));
    }

    this.dataSource = new MatTableDataSource(this.users);
  }

  /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  create(element: UserData) {
    console.log(element);
    if(element != null) {
      this.users.unshift(element);
    }
  }

  delete(element: UserData) {
    let index = this.users.findIndex(index => index === element);
    if(index > -1) {
      //postDelete(this.users[index]);
      this.users.splice(index, 1);
      console.log(this.users.length);
      this.dataSource = new MatTableDataSource(this.users);
    }
  }
}

/** Builds and returns a new User. */
function createNewUser(id: number): UserData {
  const name =
    NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
    " " +
    NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
    ".";

  return {
    name: name,
    class: COLORS[Math.round(Math.random() * (COLORS.length - 1))],
    cir: Math.round(Math.random() * 100),
    cbs: Math.round(Math.random() * 100),
    queue: id
  };
}

/** Constants used to fill up our data base. */
const COLORS = [
  "maroon",
  "red",
  "orange",
  "yellow",
  "olive",
  "green",
  "purple",
  "fuchsia",
  "lime",
  "teal",
  "aqua",
  "blue",
  "navy",
  "black",
  "gray"
];
const NAMES = [
  "Maia",
  "Asher",
  "Olivia",
  "Atticus",
  "Amelia",
  "Jack",
  "Charlotte",
  "Theodore",
  "Isla",
  "Oliver",
  "Isabella",
  "Jasper",
  "Cora",
  "Levi",
  "Violet",
  "Arthur",
  "Mia",
  "Thomas",
  "Elizabeth"
];

export interface UserData {
  name: string;
  class: string;
  cir: number;
  cbs: number;
  queue: number;
}