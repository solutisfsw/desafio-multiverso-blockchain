package util;

import desafioMorty.Transacao;
import java.security.*;
import java.util.ArrayList;
import java.util.Base64;
/**
 *
 * @author Letícia Santos - laetitia.229@gmail.com
 */
public class StringUtil {
    public static String applySha256(String input)
    {
        try
        {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(input.getBytes("UTF-8"));
            StringBuffer hexString = new StringBuffer();
            for (int i = 0; i < hash.length; i++)
            {
                String hex = Integer.toHexString(0xff & hash[i]);
                if(hex.length() == 1) hexString.append('0');
                hexString.append(hex);
            }
            return hexString.toString();
        }
        catch(Exception e)
        {
            throw new RuntimeException(e);
        }
    }
    
    public static byte[] aplicaECDSASig(PrivateKey privateKey, String input) {
        Signature dsa;
        byte[] output = new byte[0];
        try 
        {
            dsa = Signature.getInstance("ECDSA", "BC");
            dsa.initSign(privateKey);
            byte[] strByte = input.getBytes();
            dsa.update(strByte);
            byte[] realSig = dsa.sign();
            output = realSig;
        } 
        catch (Exception e) 
        {
                throw new RuntimeException(e);
        }
        return output;
    }
    
    public static boolean verificaECDSASig(PublicKey publicKey, String data, byte[] assinatura) {
        try 
        {
            Signature ecdsaVerify = Signature.getInstance("ECDSA", "BC");
            ecdsaVerify.initVerify(publicKey);
            ecdsaVerify.update(data.getBytes());
            return ecdsaVerify.verify(assinatura);
        }
        catch(Exception e) 
        {
            throw new RuntimeException(e);
        }
    }

    public static String getStringFromKey(Key key) 
    {
        return Base64.getEncoder().encodeToString(key.getEncoded());
    }
    
    public static String getMerkleRoot(ArrayList<Transacao> transacoes) 
    {
        int count = transacoes.size();
        ArrayList<String> previousTreeLayer = new ArrayList<String>();
        for(Transacao transacao : transacoes) 
        {
            previousTreeLayer.add(transacao.idTransacao);
        }
        
        ArrayList<String> treeLayer = previousTreeLayer;
        
        while(count > 1) 
        {
            treeLayer = new ArrayList<String>();
            
            for(int i=1; i < previousTreeLayer.size(); i++) 
            {
                treeLayer.add(applySha256(previousTreeLayer.get(i-1) + previousTreeLayer.get(i)));
            }
            
            count = treeLayer.size();
            previousTreeLayer = treeLayer;
        }
        
        String merkleRoot = (treeLayer.size() == 1) ? treeLayer.get(0) : "";
        return merkleRoot;
    }
}