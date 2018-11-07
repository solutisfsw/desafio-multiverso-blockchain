package desafioMorty;

import java.security.*;
import java.util.ArrayList;
import util.StringUtil;
/**
 *
 * @author Letícia Santos - laetitia.229@gmail.com
 */
public class Transacao {
    public String idTransacao;
    public PublicKey remetente;
    public PublicKey destinatario;
    public float valor;
    public byte[] assinatura;

    public ArrayList<TransacaoInput> inputs = new ArrayList<TransacaoInput>();
    public ArrayList<TransacaoOutput> outputs = new ArrayList<TransacaoOutput>();

    private static int sequencia = 0;

    public Transacao(PublicKey from, PublicKey to, float valor,  ArrayList<TransacaoInput> inputs) 
    {
        this.remetente = from;
        this.destinatario = to;
        this.valor = valor;
        this.inputs = inputs;
    }

    private String calulateHash() 
    {
        sequencia++;
        return StringUtil.applySha256(
                    StringUtil.getStringFromKey(remetente) +
                    StringUtil.getStringFromKey(destinatario) +
                    Float.toString(valor) + sequencia
                    );
    }
    
    public void geraAssinatura(PrivateKey privateKey) 
    {
	String data = StringUtil.getStringFromKey(remetente) + StringUtil.getStringFromKey(destinatario) + Float.toString(valor)	;
	assinatura = StringUtil.aplicaECDSASig(privateKey,data);		
    }
    
    public boolean verificaAssinatura() 
    {
        String data = StringUtil.getStringFromKey(remetente) + StringUtil.getStringFromKey(destinatario) + Float.toString(valor)	;
        return StringUtil.verificaECDSASig(remetente, data, assinatura);
    }
    
    public boolean processaTransacao() 
    {	
        if(verificaAssinatura()== false) 
        {
            System.out.println("#Falha ao verificar assinatura da transação#");
            return false;
        }

        for(TransacaoInput i : inputs) 
        {
            i.to = DesafioMorty.to.get(i.idTransacaoOutput);
        }

        if(getValorInput() < DesafioMorty.transacaoMinima) 
        {
            System.out.println("#Inputs de transação: " + getValorInput());
            return false;
        }

        float leftOver = getValorInput() - valor;
        idTransacao = calulateHash();
        outputs.add(new TransacaoOutput( this.destinatario, valor, idTransacao));
        outputs.add(new TransacaoOutput( this.remetente, leftOver, idTransacao));

        for(TransacaoOutput o : outputs) 
        {
            DesafioMorty.to.put(o.id, o);
        }

        for(TransacaoInput i : inputs) 
        {
            if(i.to == null) continue; 
            DesafioMorty.to.remove(i.to.id);
        }

        return true;
    }

    public float getValorInput() 
    {
        float total = 0;
        for(TransacaoInput i : inputs) 
        {
            if(i.to == null) continue;
            total += i.to.valor;
        }
        return total;
    }

    public float getValorOutputs() 
    {
        float total = 0;
        for(TransacaoOutput o : outputs) 
        {
            total += o.valor;
        }
        return total;
    }
}