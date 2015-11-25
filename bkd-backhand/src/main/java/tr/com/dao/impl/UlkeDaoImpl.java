package tr.com.dao.impl;

import java.util.List;

import javax.transaction.Transactional;

import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import tr.com.dao.UlkeDao;
import tr.com.entities.Ulke;
import tr.com.util.GenericHibernateDAO;

@Repository
@Transactional
public class UlkeDaoImpl extends GenericHibernateDAO<Ulke, Long> implements UlkeDao {

    public Ulke saveOrUpdate(Ulke ulke) {

        if (ulke.getId() != null && ulke.getId() != 0l) {
            getSession().update(ulke);
        } else {
            getSession().save(ulke);
        }

        return ulke;
    }

    @SuppressWarnings("unchecked")
    public List<Ulke> getAll() {

        Criteria criteria = getSession().createCriteria(Ulke.class);
        List<Ulke> ulke = (List<Ulke>) criteria.list();

        return ulke;
    }

    @Override
    public void deleteById(Ulke ulke) {
        getSession().delete(ulke);
    }

    @Override
    public Ulke getById(Long ulkeId) {
        Criteria criteria = getSession().createCriteria(Ulke.class);
        criteria.add(Restrictions.eq("ulkeId", ulkeId));

        Ulke prim = (Ulke) criteria.uniqueResult();

        return prim;
    }
}
