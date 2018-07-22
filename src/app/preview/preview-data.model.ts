
export class PreviewData {

  textSingle: string;
  textMulti: string[];
  textArea: string;
  moneySingle: number;
  moneyMulti: number[];
  dateSingle: string;
  dateMulti: string[];
  timeSingle: string;
  timeMulti: string[];
  comboSingle: string;
  comboMulti: string[];
  check: boolean;
  formArray: PreviewDataFormArrayElement[];

  constructor(data: {}) {
    this.textSingle         = data['textSingle']      || 'Lorem ipsum';
    this.textMulti          = data['textMulti']       || ['dolor', 'sit', 'amet'];
    this.textArea           = data['textArea']        || 'consectetur adipiscing elit. Nullam massa diam, scelerisque ut neque eu, ultrices aliquet massa.';
    this.moneySingle        = data['moneySingle']     || 16000;
    this.moneyMulti         = data['moneyMulti']      || [64000, 512000];
    this.dateSingle         = data['dateSingle']      || '14/06/2018';
    this.dateMulti          = data['dateMulti']       || ['04/11/2018', '25/12/2018'];
    this.timeSingle         = data['timeSingle']      || '08:55';
    this.timeMulti          = data['timeMulti']       || ['11:11', '18:00'];
    this.comboSingle        = data['comboSingle']     || '1';
    this.comboMulti         = data['comboMulti']      || ['2', '3'];
    this.formArray          = data['formArray']       || [new PreviewDataFormArrayElement({})];
  }

}

export class PreviewDataFormArrayElement {

  textSingle: string;
  textMulti: string[];
  textArea: string;
  moneySingle: number;
  moneyMulti: number[];
  dateSingle: string;
  dateMulti: string[];
  timeSingle: string;
  timeMulti: string[];
  comboSingle: string;
  comboMulti: string[];
  check: boolean;

  constructor(data: {}) {
    this.textSingle         = data['textSingle']      || 'Lorem ipsum';
    this.textMulti          = data['textMulti']       || ['dolor', 'sit', 'amet'];
    this.textArea           = data['textArea']        || 'consectetur adipiscing elit. Nullam massa diam, scelerisque ut neque eu, ultrices aliquet massa.';
    this.moneySingle        = data['moneySingle']     || 16000;
    this.moneyMulti         = data['moneyMulti']      || [64000, 512000];
    this.dateSingle         = data['dateSingle']      || '14/06/2018';
    this.dateMulti          = data['dateMulti']       || ['04/11/2018', '25/12/2018'];
    this.timeSingle         = data['timeSingle']      || '08:55';
    this.timeMulti          = data['timeMulti']       || ['11:11', '18:00'];
    this.comboSingle        = data['comboSingle']     || '1';
    this.comboMulti         = data['comboMulti']      || ['2', '3'];
  }

}
