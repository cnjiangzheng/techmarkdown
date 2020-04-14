1.�����ڴ��key-value���ݿ�
2.����c���Ա�д�ģ�����֧�ֶ������Ե�api //setÿ��11��Σ�ȡget 81000��
3.֧�����ݳ־û�
4.value������string��hash�� list�� set, sorted set

ʹ�ó���
1. ȥ����n�����ݵĲ���
2. ���а�ȡtop n������ //�������ǰ10��
3. ��ȷ�����ù���ʱ��
4. ������
5. ʵʱϵͳ�� ������ϵͳ
6. pub�� sub�������Ĺ���ʵʱ��Ϣϵͳ
7. ������Ϣ����
8. ����
String:���桢������������������ʽ�����ֲ�ʽSession
Hash:�洢�û���Ϣ���û���ҳ����������ϲ�ѯ
List:΢����ע��ʵ�����б����ж�
Set:�ޡ��ȡ���ǩ�����ѹ�ϵ
Zset:���а�

###cmd����redis
redis-cli.exe -h 127.0.0.1 -p 6379


###Sentinel ����
�����г����� Sentinel ���ܵ����

PING ������ PONG ��
SENTINEL masters ���г����б����ӵ������������Լ���Щ���������ĵ�ǰ״̬��
SENTINEL slaves <master name> ���г������������������дӷ��������Լ���Щ�ӷ������ĵ�ǰ״̬��
SENTINEL get-master-addr-by-name <master name> �� ���ظ������ֵ����������� IP ��ַ�Ͷ˿ںš� ������������������ִ�й���ת�Ʋ����� �������������������Ĺ���ת�Ʋ����Ѿ���ɣ� ��ô���������µ����������� IP ��ַ�Ͷ˿ںš�
SENTINEL reset <pattern> �� �����������ֺ͸���ģʽ pattern ��ƥ������������� pattern ������һ�� Glob ����ģʽ�� ���ò��������������Ŀǰ������״̬�� ��������ִ���еĹ���ת�ƣ� ���Ƴ�Ŀǰ�Ѿ����ֺ͹����ģ� �������������дӷ������� Sentinel ��
SENTINEL failover <master name> �� ����������ʧЧʱ�� �ڲ�ѯ������ Sentinel ���������£� ǿ�ƿ�ʼһ���Զ�����Ǩ�� �������������ת�Ƶ� Sentinel �������� Sentinel ����һ���µ����ã����� Sentinel �����������ý�����Ӧ�ĸ��£���


###key
    keys * ��ȡ���е�key
    select 0 ѡ���һ����
    move myString 1 ����ǰ�����ݿ�key�ƶ���ĳ�����ݿ�,Ŀ����У������ƶ�
    flush db      ���ָ����
    randomkey     ���key
    type key      ����
    
    set key1 value1 ����key
    get key1    ��ȡkey
    mset key1 value1 key2 value2 key3 value3
    mget key1 key2 key3
    del key1   ɾ��key
    exists key      �ж��Ƿ����key
    expire key 10   10����
    pexpire key 1000 ����
    persist key     ɾ������ʱ��

###string
    set name cxx
    get name
    getrange name 0 -1        �ַ����ֶ�
    getset name new_cxx       ����ֵ�����ؾ�ֵ
    mset key1 key2            ��������
    mget key1 key2            ������ȡ
    setnx key value           �����ھͲ��루not exists��
    setex key time value      ����ʱ�䣨expire��
    setrange key index value  ��index��ʼ�滻value
    incr age        ����
    incrby age 10   ����
    decr age        �ݼ�
    decrby age 10   �ݼ�
    incrbyfloat     ����������
    append          ׷��
    strlen          ����
    getbit/setbit/bitcount/bitop    λ����
    
###hash
    hset myhash name cxx
    hget myhash name
    hmset myhash name cxx age 25 note "i am notes"
    hmget myhash name age note   
    hgetall myhash               ��ȡ���е�
    hexists myhash name          �Ƿ����
    hsetnx myhash score 100      ���ò����ڵ�
    hincrby myhash id 1          ����
    hdel myhash name             ɾ��
    hkeys myhash                 ֻȡkey
    hvals myhash                 ֻȡvalue
    hlen myhash                  ����

###list
    lpush mylist a b c  �����
    rpush mylist x y z  �Ҳ���
    lrange mylist 0 -1  ���ݼ���
    lpop mylist  ����Ԫ��
    rpop mylist  ����Ԫ��
    llen mylist  ����
    lrem mylist count value  ɾ��
    lindex mylist 2          ָ��������ֵ
    lset mylist 2 n          ������ֵ
    ltrim mylist 0 4         ɾ��key
    linsert mylist before a  ����
    linsert mylist after a   ����
    rpoplpush list list2     ת���б������
    
###set
    sadd myset redis 
    smembers myset       ���ݼ���
    srem myset set1         ɾ��
    sismember myset set1 �ж�Ԫ���Ƿ��ڼ�����
    scard key_name       ����
    sdiff | sinter | sunion ���������ϼ����㣺� | ���� | ����
    srandmember          �����ȡ�����е�Ԫ��
    spop                 �Ӽ����е���һ��Ԫ��
    
###zset
    zadd zset 1 one
    zadd zset 2 two
    zadd zset 3 three
    zincrby zset 1 one              ��������
    zscore zset two                 ��ȡ����
    zrange zset 0 -1 withscores     ��Χֵ
    zrangebyscore zset 10 25 withscores ָ����Χ��ֵ
    zrangebyscore zset 10 25 withscores limit 1 2 ��ҳ
    Zrevrangebyscore zset 10 25 withscores  ָ����Χ��ֵ
    zcard zset  Ԫ������
    Zcount zset ���ָ��������Χ�ڵ�Ԫ�ظ���
    Zrem zset one two        ɾ��һ������Ԫ��
    Zremrangebyrank zset 0 1  ����������Χɾ��Ԫ��
    Zremrangebyscore zset 0 1 ���շ�����Χɾ��Ԫ��
    Zrank zset 0 -1    ������С��Ԫ������Ϊ0
    Zrevrank zset 0 -1  ��������Ԫ������Ϊ0
    Zinterstore
    zunionstore rank:last_week 7 rank:20150323 rank:20150324 rank:20150325  weights 1 1 1 1 1 1 1
    
    
###����
    sort mylist  ����
    sort mylist alpha desc limit 0 2 ��ĸ����
    sort list by it:* desc           by����
    sort list by it:* desc get it:*  get����
    sort list by it:* desc get it:* store sorc:result  sort����֮store��������ʾ��sort��ѯ�Ľ������������

###�����뷢����
    ����Ƶ����subscribe chat1
    ������Ϣ��publish chat1 "hell0 ni hao"
    �鿴Ƶ����pubsub channels
    �鿴ĳ��Ƶ���Ķ���������: pubsub numsub chat1
    �˶�ָ��Ƶ���� unsubscrible chat1   , punsubscribe java.*
    ����һ��Ƶ���� psubscribe java.*
    
###redis���
     �����ԣ�ԭ���ԣ� 
     ���裺  ��ʼ����ִ������ύ����
             multi  //��������
             sadd myset a b c
             sadd myset e f g
             lpush mylist aa bb cc
             lpush mylist dd ff gg

###����������
    dump.rdb
    appendonly.aof
    //BgRewriteAof �첽ִ��һ��aop(appendOnly file)�ļ���д
    �ᴴ����ǰһ��AOF�ļ�������Ż��汾
    
    //BgSave ��̨�첽�������ݵ����̣����ڵ�ǰĿ¼�´����ļ�dump.rdb
    //saveͬ���������ݵ����̣������������̣���Ŀͻ����޷�����
    
    //client kill �رտͻ�������
    //client list �г����еĿͻ���
    
    //���ͻ�������һ������
      client setname myclient1
      client getname
      
     config get port
     //configRewrite ��redis�������ļ����и�д

###rdb 
     save 900 1
     save 300 10
     save 60 10000

###aop���ݴ���
     appendonly yes �����־û�
     appendfsync everysec ÿ�뱸��һ��

###���
     bgsave�첽�������ݵ����̣����ձ��棩
     lastsave�����ϴγɹ����浽���̵�unix��ʱ���
     shutdownͬ�����浽���������ر�redis������
     bgrewriteaof�ļ�ѹ���������