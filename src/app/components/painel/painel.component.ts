import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';
import * as d3 from 'd3';
import { Sender } from 'src/app/models/sender';

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css'],
})
export class PainelComponent implements OnInit {
  private dataA = [
    { Framework: 'Jan', Stars: '166443', Released: '2014' },
    { Framework: 'Fevereiro', Stars: '150793', Released: '2013' },
    { Framework: 'Março', Stars: '62342', Released: '2016' },
    { Framework: 'Abril', Stars: '27647', Released: '2010' },
    { Framework: 'Junho', Stars: '21471', Released: '2011' },
    { Framework: 'Julho', Stars: '21471', Released: '2011' },
    { Framework: 'Agosto', Stars: '2140', Released: '2011' },
    { Framework: 'Setembro', Stars: '0', Released: '2011' },
    { Framework: 'Outubro', Stars: '0', Released: '2011' },
    { Framework: 'Novembro', Stars: '0', Released: '2011' },
    { Framework: 'Dezembro', Stars: '0', Released: '2011' }
  ];
  private data = [
    { Framework: 'DTI', Stars: '166443', Released: '2014' },
    { Framework: 'ADMIN', Stars: '150793', Released: '2013' },
    { Framework: 'RH', Stars: '62342', Released: '2016' }
  ];
  private svg: any;
  private margin = 50;
  private width = 750 - this.margin * 2;
  private height = 400 - this.margin * 2;

  private svgB: any;
  private widthB = 340;
  private heightB = 300;
  private marginB = 10;
  private radius = Math.min(this.widthB, this.height) / 2 - this.marginB;
  private colors: any = null;

  senders: Sender[] = [];

  constructor(private service: GeneralService) {}

  ngOnInit(): void {
    this.carregar();
    this.createSvg();
    this.drawBars(this.dataA);

    this.createSvgB();
    this.createColorsB();
    this.drawChart();
  }

  carregar() {
    this.service.getter('senders').subscribe(
      (res) => {
        this.senders = res;
      },
      (error) => {}
    );
  }

  private createSvg(): void {
    this.svg = d3
      .select('figure#bar')
      .append('svg')
      .attr('width', this.width + this.margin * 2)
      .attr('height', this.height + this.margin * 2)
      .append('g')
      .attr('transform', 'translate(' + this.margin + ',' + this.margin + ')');
  }

  private drawBars(data: any[]): void {
    // Create the X-axis band scale
    const x = d3
      .scaleBand()
      .range([0, this.width])
      .domain(data.map((d) => d.Framework))
      .padding(0.2);

    // Draw the X-axis on the DOM
    this.svg
      .append('g')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('transform', 'translate(-10,0)rotate(-45)')
      .style('text-anchor', 'end');

    // Create the Y-axis band scale
    const y = d3.scaleLinear().domain([0, 200000]).range([this.height, 0]);

    // Draw the Y-axis on the DOM
    this.svg.append('g').call(d3.axisLeft(y));

    // Create and fill the bars
    this.svg
      .selectAll('bars')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d: any) => x(d.Framework))
      .attr('y', (d: any) => y(d.Stars))
      .attr('width', x.bandwidth())
      .attr('height', (d: any) => this.height - y(d.Stars))
      .attr('fill', '#008cff');
  }

  /** B **/
  private createSvgB(): void {
    this.svgB = d3
      .select('figure#pie')
      .append('svg')
      .attr('width', this.widthB)
      .attr('height', this.heightB)
      .append('g')
      .attr(
        'transform',
        'translate(' + this.widthB / 2 + ',' + this.heightB / 2 + ')'
      );
  }
  private createColorsB(): void {
    this.colors = d3
      .scaleOrdinal()
      .domain(this.data.map((d) => d.Stars.toString()))
      .range(['#c7d3ec', '#a5b8db', '#879cc4', '#677795', '#5a6782']);
  }

  private drawChart(): void {
    // Compute the position of each group on the pie:
    const pie = d3.pie<any>().value((d: any) => Number(d.Stars));

    // Build the pie chart
    this.svgB
    .selectAll('pieces')
    .data(pie(this.data))
    .enter()
    .append('path')
    .attr('d', d3.arc()
      .innerRadius(0)
      .outerRadius(this.radius)
    )
    .attr('fill', (d: any, i: any) => (this.colors(i)))
    .attr("stroke", "#121926")
    .style("stroke-width", "1px");

    // Add labels
    const labelLocation = d3.arc()
    .innerRadius(100)
    .outerRadius(this.radius);

    this.svgB
    .selectAll('pieces')
    .data(pie(this.data))
    .enter()
    .append('text')
    .text((d: any)=> d.data.Framework)
    .attr("transform", (d: any) => "translate(" + labelLocation.centroid(d) + ")")
    .style("text-anchor", "middle")
    .style("font-size", 15);
  }
}
