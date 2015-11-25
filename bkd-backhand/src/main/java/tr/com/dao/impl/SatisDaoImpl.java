package tr.com.dao.impl;

import java.util.List;

import javax.transaction.Transactional;

import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import tr.com.dao.SatisDao;
import tr.com.entities.Satis;
import tr.com.util.GenericHibernateDAO;

@Repository
@Transactional
public class SatisDaoImpl extends GenericHibernateDAO<Satis, Long> implements SatisDao {

    public Satis saveOrUpdate(Satis satis) {

        if (satis.getId() != null && satis.getId() != 0l) {
            getSession().update(satis);
        } else {
            getSession().save(satis);
        }

        return satis;
    }

    @SuppressWarnings("unchecked")
    public List<Satis> getAll() {

        Criteria criteria = getSession().createCriteria(Satis.class);
        List<Satis> satis = (List<Satis>) criteria.list();

        return satis;
    }

    @Override
    public void deleteById(Satis satis) {
        getSession().delete(satis);
    }

    @Override
    public Satis getById(Long satisId) {
        Criteria criteria = getSession().createCriteria(Satis.class);
        criteria.add(Restrictions.eq("satisId", satisId));

        Satis prim = (Satis) criteria.uniqueResult();

        return prim;
    }
}
