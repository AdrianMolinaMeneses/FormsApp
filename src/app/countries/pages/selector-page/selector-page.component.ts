import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountriesService } from '../../services/countries.service';
import { Country, Region, SmallCountry } from '../../interfaces/country';
import { filter, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styleUrl: './selector-page.component.scss',
})
export class SelectorPageComponent implements OnInit, OnDestroy {
  public myForm!: FormGroup;
  public countriesByRegion: SmallCountry[] = [];
  public borders: SmallCountry[] = [];

  constructor(
    private fb: FormBuilder,
    private countriesService: CountriesService
  ) {}

  ngOnInit(): void {
    this.myForm = this.fb.group({
      region: ['', Validators.required],
      country: ['', Validators.required],
      border: ['', Validators.required],
    });

    this.onRegionChanged();
    this.onCountryChanged();
  }

  onRegionChanged(): void {
    this.myForm
      .get('region')!
      .valueChanges.pipe(
        tap(() => this.myForm.get('country')!.setValue('')),
        tap(() => (this.borders = [])),
        switchMap((region) =>
          this.countriesService.getCountriesByRegion(region)
        )
      )
      .subscribe((countries) => {
        this.countriesByRegion = this.sortCountriesByName(countries);
      });
  }

  onCountryChanged(): void {
    this.myForm
      .get('country')!
      .valueChanges.pipe(
        tap(() => this.myForm.get('border')!.setValue('')),
        filter((value: string) => value.length > 0),
        switchMap((alphaCode) =>
          this.countriesService.getCountryByAlphaCode(alphaCode)
        ),
        switchMap((country) =>
          this.countriesService.getCountryBordersByCodes(country.borders)
        )
      )
      .subscribe((countries) => {
        this.borders = countries;
      });
  }

  sortCountriesByName(countries: SmallCountry[]): SmallCountry[] {
    return countries.sort((a, b) => (a.name < b.name ? -1 : 1));
  }

  get regions(): Region[] {
    return this.countriesService.regions;
  }

  get region() {
    return this.myForm.controls['region'].value;
  }

  get country() {
    return this.myForm.controls['country'].value;
  }

  get border() {
    return this.myForm.controls['border'].value;
  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
}
