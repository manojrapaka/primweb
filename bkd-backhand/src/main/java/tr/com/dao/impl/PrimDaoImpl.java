package tr.com.dao.impl;

import java.util.List;

import javax.transaction.Transactional;

import org.hibernate.Criteria;import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import tr.com.dao.PrimDao;
import tr.com.entities.Prim;
import tr.com.util.GenericHibernateDAO;


@Repository
@Transactional
public class PrimDaoImpl extends GenericHibernateDAO<Prim, Long> implements PrimDao{

	public Prim saveOrUpdate(Prim prim) {
		
		if(prim.getId() != null && prim.getId() != 0l){
			getSession().update(prim);
		} else {
			getSession().save(prim);
		}
		
		return prim;
	}

	@SuppressWarnings("unchecked")
	public List<Prim> getAll() {
		
		Criteria criteria = getSession().createCriteria(Prim.class);
		List<Prim> prim = (List<Prim>) criteria.list();

		return prim;
	}
	
	@Override
	public void deleteById(Prim prim) {
		getSession().delete(prim);
	}

	@Override
	public Prim getById(Long primId) {
		Criteria criteria = getSession().createCriteria(Prim.class);
		criteria.add(Restrictions.eq("primId", primId));
		
		Prim prim = (Prim) criteria.uniqueResult();
		
		return prim;
	}
}
