import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { config } from '../../config/config';

const cookies = new Cookies();
const pageSize = 12;

// Key the caller by endpoint so a new result set starts on page 1.
export default function useProductPages(endpoint) {
  const enabled = Boolean(endpoint);
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState(enabled ? 'loading' : 'idle');
  const [hasMore, setHasMore] = useState(false);
  const sentinel = useRef(null);
  const token = cookies.get('token');

  useEffect(() => {
    if (!enabled) return;
    const controller = new AbortController();

    async function loadPage() {
      setStatus('loading');
      try {
        const { data } = await axios({
          method: 'get',
          url: `${config.SERVER}${endpoint}?page=${page}&pageSize=${pageSize}`,
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
          signal: controller.signal,
        });
        if (controller.signal.aborted) return;

        const { allProducts, total } = data;
        if (!Array.isArray(allProducts) || !Number.isFinite(total)) {
          throw new Error('Respuesta de productos inválida');
        }

        setProducts(previous => page === 1 ? allProducts : [...previous, ...allProducts]);
        setHasMore(allProducts.length > 0 && page * pageSize < total);
        setStatus('success');
      } catch {
        if (controller.signal.aborted) return;
        setHasMore(false);
        setStatus('error');
      }
    }

    loadPage();
    return () => controller.abort();
  }, [enabled, endpoint, page, token]);

  useEffect(() => {
    if (status !== 'success' || !hasMore || !sentinel.current) return;
    let active = true;
    const observer = new IntersectionObserver(entries => {
      if (!active || !entries.some(entry => entry.isIntersecting)) return;
      active = false;
      observer.disconnect();
      setStatus('loading');
      setPage(current => current + 1);
    });
    observer.observe(sentinel.current);
    return () => {
      active = false;
      observer.disconnect();
    };
  }, [status, hasMore]);

  return { products, status, page, hasMore, sentinel };
}
