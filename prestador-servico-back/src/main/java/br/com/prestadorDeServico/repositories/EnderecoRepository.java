package br.com.prestadorDeServico.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.prestadorDeServico.entities.Endereco;

public interface EnderecoRepository extends JpaRepository<Endereco, Integer> {

	
}
