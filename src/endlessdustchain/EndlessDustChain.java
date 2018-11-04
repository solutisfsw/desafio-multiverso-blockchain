/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package endlessdustchain;
import javax.swing.JLabel;
import javax.swing.JTextArea;

/**
 *
 * @author Caio Victor Sampaio
 */
public class EndlessDustChain {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        System.out.println(">> BLOCKCHAIN BASED ON CRYPTOCURRENCY <<\n\n");
        System.out.println("First, creating a few wallets...\n");
        //Creating some wallets
        Wallet w1 = new Wallet("Sophons");
        Wallet w2 = new Wallet("Hissho");
        Wallet w3 = new Wallet("Riftborn");
        //Initializing a new Chain
        BlockChain dustchain = new BlockChain(w1.getAddress(),1000);
        
        System.out.println("Now, making some transactions... \n");
        //Filling up some Transactions...
        dustchain.createTransaction(new Transaction(w1.getAddress(),w2.getAddress(),500));
        dustchain.createTransaction(new Transaction(w1.getAddress(),w3.getAddress(),100));
        //Mining the first Block
        System.out.println("\nMining the First Block\n");
        dustchain.mineTransactions(w2.getAddress());
        //More Transactions
        System.out.println("The Chain Continues...\n");
        dustchain.createTransaction(new Transaction(w2.getAddress(),w3.getAddress(),200));
        Wallet w4 = new Wallet("Cravers");
        dustchain.createTransaction(new Transaction(w1.getAddress(),w4.getAddress(),200));
        //More Mining
        dustchain.mineTransactions(w3.getAddress());
        
        //Showing the balance of accounts
        System.out.println("\nShowing the Balance of each Wallet");
        System.out.println(">  " + w1.getAddress() + " " + dustchain.getBalanceOfAddress(w1.getAddress()));
        System.out.println(">  " + w2.getAddress() + " " + dustchain.getBalanceOfAddress(w2.getAddress()));
        System.out.println(">  " + w3.getAddress() + " " + dustchain.getBalanceOfAddress(w3.getAddress()));
        System.out.println(">  " + w4.getAddress() + " " + dustchain.getBalanceOfAddress(w4.getAddress()));
        
        System.out.println("\n\n Now, printing the entire BlockChain \n\n");
        dustchain.printChain();
    }
}