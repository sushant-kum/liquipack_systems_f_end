import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "comp-sub-head",
  templateUrl: "./sub-head.component.html",
  styleUrls: ["./sub-head.component.scss"]
})
export class SubHeadComponent implements OnInit {
  @Input() color: "primary" | "accent" | "warn" = "accent";
  constructor() {}

  ngOnInit() {}
}
