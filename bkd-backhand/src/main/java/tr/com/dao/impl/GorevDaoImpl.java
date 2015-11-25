package tr.com.dao.impl;

import java.util.List;

import javax.transaction.Transactional;

import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import tr.com.dao.GorevDao;
import tr.com.entities.Gorev;
import tr.com.util.GenericHibernateDAO;

@Repository
@Transactional
public class GorevDaoImpl extends GenericHibernateDAO<Gorev, Long> implements GorevDao {

    public Gorev saveOrUpdate(Gorev gorev) {

        if (gorev.getId() != null && gorev.getId() != 0l) {
            getSession().update(gorev);
        } else {
            getSession().save(gorev);
        }

        return gorev;
    }

    @SuppressWarnings("unchecked")
    public List<Gorev> getAll() {

        Criteria criteria = getSession().createCriteria(Gorev.class);
        List<Gorev> gorev = (List<Gorev>) criteria.list();

        return gorev;
    }

    @Override
    public void deleteById(Gorev gorev) {
        getSession().delete(gorev);
    }

    @Override
    public Gorev getById(Long gorevId) {
        Criteria criteria = getSession().createCriteria(Gorev.class);
        criteria.add(Restrictions.eq("gorevId", gorevId));

        Gorev prim = (Gorev) criteria.uniqueResult();

        return prim;
    }
}
