package tr.com.dao.impl;

import java.util.List;

import javax.transaction.Transactional;

import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import tr.com.dao.KullaniciDao;
import tr.com.entities.Kullanici;
import tr.com.util.GenericHibernateDAO;

@Repository
@Transactional
public class KullaniciDaoImpl extends GenericHibernateDAO<Kullanici, Long> implements KullaniciDao {

    public Kullanici saveOrUpdate(Kullanici kullanici) {

        if (kullanici.getId() != null && kullanici.getId() != 0l) {
            getSession().update(kullanici);
        } else {
            getSession().save(kullanici);
        }

        return kullanici;
    }

    @SuppressWarnings("unchecked")
    public List<Kullanici> getAll() {

        Criteria criteria = getSession().createCriteria(Kullanici.class);
        List<Kullanici> kullanici = (List<Kullanici>) criteria.list();

        return kullanici;
    }

    @Override
    public void deleteById(Kullanici kullanici) {
        getSession().delete(kullanici);
    }

    @Override
    public Kullanici getById(Long kullaniciId) {
        Criteria criteria = getSession().createCriteria(Kullanici.class);
        criteria.add(Restrictions.eq("kullaniciId", kullaniciId));

        Kullanici prim = (Kullanici) criteria.uniqueResult();

        return prim;
    }
}
