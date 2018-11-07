package desafioMorty;

import java.security.*;
import java.security.spec.ECGenParameterSpec;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import static org.bouncycastle.asn1.x509.ObjectDigestInfo.publicKey;
/**
 *
 * @author Letícia Santos - laetitia.229@gmail.com
 */
public class Carteira {
    public PrivateKey chavePrivada;
    public PublicKey chavePublica;
    public HashMap<String,TransacaoOutput> tos = new HashMap<String,TransacaoOutput>();
    
    public Carteira()
    {
        gerarParChave();
    }
    
    public void gerarParChave()
    {
        try
        {
            KeyPairGenerator geradorChave = KeyPairGenerator.getInstance("ECDSA", "BC");
            SecureRandom random = SecureRandom.getInstance("SHA1PRNG");
            ECGenParameterSpec ecEspec = new ECGenParameterSpec("prime192v1");
            geradorChave.initialize(ecEspec, random);
            KeyPair parChave = geradorChave.generateKeyPair();
            chavePrivada = parChave.getPrivate();
            chavePublica = parChave.getPublic();
        }
        catch(Exception e)
        {
            throw new RuntimeException(e);
        }
    }

    public float getBalanco() 
    {
        float total = 0;	
        for (Map.Entry<String, TransacaoOutput> item: DesafioMorty.to.entrySet())
        {
            TransacaoOutput to = item.getValue();
            if(to.ehMeu(chavePublica)) 
            {
                tos.put(to.id, to);
            	total += to.valor; 
            }
        }  
        return total;
    }
	
    public Transacao enviaValor(PublicKey _destinatario, float valor)
    {
        if(getBalanco() < valor) 
        {
            System.out.println("#Não há valores suficientes para a transação.#");
            return null;
        }

        ArrayList<TransacaoInput> inputs = new ArrayList<TransacaoInput>();

        float total = 0;
        for (Map.Entry<String, TransacaoOutput> item: tos.entrySet())
        {
            TransacaoOutput to = item.getValue();
            total += to.valor;
            inputs.add(new TransacaoInput(to.id));
            if(total > valor) break;
        }

        Transacao novaTransacao = new Transacao(chavePublica, _destinatario , valor, inputs);
        novaTransacao.geraAssinatura(chavePrivada);

        for(TransacaoInput input: inputs)
        {
            tos.remove(input.idTransacaoOutput);
        }
        return novaTransacao;
    }  
}