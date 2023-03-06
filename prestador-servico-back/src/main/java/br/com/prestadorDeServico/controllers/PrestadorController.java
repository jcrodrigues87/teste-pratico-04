package br.com.prestadorDeServico.controllers;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.prestadorDeServico.entities.Contato;
import br.com.prestadorDeServico.entities.Endereco;
import br.com.prestadorDeServico.entities.Prestador;
import br.com.prestadorDeServico.repositories.ContatoRepository;
import br.com.prestadorDeServico.repositories.EnderecoRepository;
import br.com.prestadorDeServico.repositories.PrestadorRepository;
import jakarta.transaction.Transactional;

@RestController
@RequestMapping(value = "/prestadores")
public class PrestadorController {
	
	@Autowired
	private PrestadorRepository repository;
	
	@Autowired
	private EnderecoRepository endrepository;
	
	@Autowired
	private ContatoRepository contrepository;

	
	@GetMapping(value = "/buscartodos")
	public List<Prestador> findAll(){
		
		List<Prestador> resultado = repository.findAll();
		return resultado;
	}
	
	@PostMapping(value = "/cadastrar")
	@Transactional
	public Prestador cadastrar(@RequestBody Prestador prestador){
		
		Endereco endereco = endrepository.save(prestador.getEndereco());
		
		prestador.setEndereco(endereco);
		
		var result = repository.save(prestador);		
		
		int qtde = prestador.getContato().size();
		
		for(int i = 0; i <= qtde -1; i++) {
			Contato c = new Contato();
			c = prestador.getContato().get(i);
			c.setPrestador(result);
			contrepository.save(c);						
		}
		
		return prestador;		
		
		
	}
	
	
	
}
