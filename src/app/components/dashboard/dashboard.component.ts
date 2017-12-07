import { Component, OnInit } from '@angular/core';
import Web3 from 'web3';
var Accounts = require('web3-eth-accounts');

import { Observable } from 'rxjs/Observable';

export class Account {
  address: any;
  balance: number;
  balanceEth: string;
}

@Component({
  selector: 'eth-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  private web3: Web3;
  private web3Accounts;
  private testRpcUrl: string = "http://localhost:8545";

  private accounts: Account[] = [];

  constructor() { }

  ngOnInit() {
    this.web3 = new Web3(new Web3.providers.HttpProvider(this.testRpcUrl));
    this.web3Accounts = new Accounts(this.testRpcUrl);
    this.web3.eth.net.isListening().then(isConnected => {
        console.log('Successfully connected to TestRPC instance at: ' + this.testRpcUrl);
        this.updateAccounts();
    }, error => {
        console.log('Unable to connect to TestRPC instance at: ' + this.testRpcUrl);
    })
  }

  createAccount() {
      var accSub = Observable.fromPromise(this.web3.eth.personal.newAccount("mySecureTestPassword123!@#"));
      accSub.subscribe(newAccAddress => {
        var account = new Account();
        account.address = newAccAddress;
        var subscription = Observable.fromPromise(this.web3.eth.getBalance(account.address));
        subscription.subscribe(balance => {
          account.balance = balance;
          account.balanceEth = this.toEther(account.balance);
          this.accounts.push(account)
        });
      });
  }

  updateAccounts(): void {
    this.accounts = [];
    var subscription = Observable.fromPromise(this.web3.eth.getAccounts());
    subscription.subscribe((addresses: string[]) => { 
      addresses.forEach((address: string) => {
        var account = new Account();
        account.address = address;
        var subscription = Observable.fromPromise(this.web3.eth.getBalance(address));
        subscription.subscribe(balance => {
          account.balance = balance;
          account.balanceEth = this.toEther(account.balance);
          this.accounts.push(account)
        });
      });
    });
  }

  private toEther(wei: number): string {
    return (wei / 1000000000000000000).toFixed(18);
  }


}
