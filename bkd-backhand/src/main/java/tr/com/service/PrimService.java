package tr.com.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import tr.com.dao.PrimDao;
import tr.com.entities.Prim;

@Service
@EnableTransactionManagement
public class PrimService {

	@Autowired
	private PrimDao primDao;

	public void saveOrUpdate(Prim prim) {
		primDao.saveOrUpdate(prim);
	}

	public List<Prim> getAll() {
		return primDao.getAll();
	}

	public void deleteById(Prim prim) {
		primDao.deleteById(prim);		
	}

	public Prim getById(Long primId) {
		return primDao.getById(primId);
	}
}