import { NgClass } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { ExecutiveDirectorNominee } from '../../../helpers/models/executive-director/executive-director-nominee';
import { ExecutiveDirectorNomineeService } from '../../../helpers/services/executive-director/executive-director-nominee.service';
import { ToastService } from '../../../helpers/services/system/toast.service';

@Component({
  selector: 'executive-director-nominee-form',
  imports: [
    FormsModule,
    Button,
    InputText,
    NgClass,
    ToggleSwitchModule,
    Select,
  ],
  templateUrl: './executive-director-nominee-form.component.html',
  styleUrl: './executive-director-nominee-form.component.scss',
})
export class ExecutiveDirectorNomineeFormComponent {
  nominees: ExecutiveDirectorNominee[] = [];
  allNominees: ExecutiveDirectorNominee[] = [];
  saveInProgress: boolean = false;
  submitted: boolean = false;
  edit: boolean = false;
  periods = [
    {
      id: 1,
      description: '2025',
      yearPeriod: '2025',
    },
  ];
  @Input() nominee: ExecutiveDirectorNominee = {} as ExecutiveDirectorNominee;
  @ViewChild('form') form!: NgForm;
  @Output('onSave') nomineeSaved = new EventEmitter<ExecutiveDirectorNominee>();
  constructor(
    private readonly nomineeService: ExecutiveDirectorNomineeService,
    private readonly toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.getNominees();
  }

  ngOnChanges() {
    if (this.nominee?.id) {
      this.edit = true;
    } else {
      this.edit = false;
    }
  }

  getNominees() {
    this.nomineeService.getAllNominees().subscribe({
      next: (nominees) => {
        this.allNominees = nominees;
      },
    });
  }

  save() {
    this.submitted = true;

    if (!this.form.valid) {
      return;
    }

    this.saveInProgress = true;

    this.nomineeService.createNominee(this.nominee).subscribe({
      next: (nominee) => {
        this.toastService.showSuccess('Guardado', 'Nominado creado');
        this.saveInProgress = false;
        this.nomineeSaved.emit(nominee);
      },
      error: (err) => {
        this.saveInProgress = false;
        this.toastService.showError('Error', err.error?.message);
      },
    });
  }

  update() {
    this.submitted = true;

    if (!this.form.valid) {
      return;
    }

    this.saveInProgress = true;

    this.nomineeService.updateNominee(this.nominee).subscribe({
      next: (nominee) => {
        this.toastService.showSuccess('Guardado', 'Nominado actualizado');
        this.saveInProgress = false;
        this.nomineeSaved.emit(nominee);
      },
      error: (err) => {
        this.saveInProgress = false;
        this.toastService.showError('Error', err.error?.message);
      },
    });
  }
}
