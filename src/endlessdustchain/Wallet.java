/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package endlessdustchain;

/**
 *
 * @author Caio Victor Sampaio
 */
public class Wallet {
    private final String address;
    
    public Wallet(String add){
        this.address = add;
        System.out.println(getAddress() + " got a new Wallet and joined the DustChain!");
    }
    
    public String getAddress(){
        return this.address;
    }
}
