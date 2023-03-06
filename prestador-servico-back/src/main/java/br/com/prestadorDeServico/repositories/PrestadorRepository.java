package br.com.prestadorDeServico.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.prestadorDeServico.entities.Prestador;

public interface PrestadorRepository extends JpaRepository<Prestador, String> {
	
	

}
