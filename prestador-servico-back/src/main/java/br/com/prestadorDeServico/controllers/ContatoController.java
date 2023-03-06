package br.com.prestadorDeServico.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.prestadorDeServico.entities.Contato;
import br.com.prestadorDeServico.repositories.ContatoRepository;

@RestController
@RequestMapping(value = "/contatos")
public class ContatoController {
	
	@Autowired
	private ContatoRepository repository;
	
	

	@GetMapping(value = "/{cnpj}")
	public List<Contato> findByCnpj(@PathVariable("cnpj") String cnpj){
		
		List<Contato> contatos = repository.findByCnpj(cnpj);
		List<Contato> cnt = new ArrayList<Contato>();
		
		for(int i=0; i <= (contatos.size() -1); i++) {
			
			Contato c = new Contato();
			c.setDepartamento(contatos.get(i).getDepartamento());
			c.setEmail(contatos.get(i).getEmail());
			c.setNome(contatos.get(i).getNome());
			cnt.add(c);
		}
		
		
		return cnt;
		
	}


	public ContatoRepository getRepository() {
		return repository;
	}


	public void setRepository(ContatoRepository repository) {
		this.repository = repository;
	}

}
