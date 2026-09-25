import { Injectable } from '@nestjs/common';
import { Expense } from './expense.js';

@Injectable()
export class AppService {
  expenses: Expense[] = [
    {
      name: 'Élelmiszer',
      amount: 12500,
      category: 'food',
    },
    {
      name: 'Villanyszámla',
      amount: 18500,
      category: 'utilities',
    },
    {
      name: 'Netflix',
      amount: 3990,
      category: 'entertainment',
    },
    {
      name: 'Buszjegy',
      amount: 2500,
      category: 'misc',
    },
    {
      name: 'Ebéd',
      amount: 4200,
      category: 'food',
    },
    {
      name: 'Internet',
      amount: 7500,
      category: 'utilities',
    },
    {
      name: 'Mozi',
      amount: 4500,
      category: 'entertainment',
    },
    {
      name: 'Tisztítószerek',
      amount: 6300,
      category: 'misc',
    },
    {
      name: 'Bevásárlás',
      amount: 15600,
      category: 'food',
    },
    {
      name: 'Vízszámla',
      amount: 5200,
      category: 'utilities',
    },
  ];

  getExpenses(): Expense[] {
    return this.expenses;
  }
}